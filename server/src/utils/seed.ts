
import { faker } from '@faker-js/faker';
import prisma from './prisma'

// NOP
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

async function main() {
  await prisma.deliveryStatusLog.deleteMany();
  await prisma.deliveryOtp.deleteMany();
  await prisma.rating.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.discount.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();

  const users = await Promise.all(
    [...Array(10)].map((_, i) =>
      prisma.user.create({
        data: {
          name: `user${i}`,
          email: `user${i}@x.com`,
          password: `pass${i}`,
          role: i < 2 ? 'ADMIN' : i < 4 ? 'MANAGER' : i < 7 ? 'DELIVERY' : 'CUSTOMER',
        },
      })
    )
  );

  const addresses = await Promise.all(
    users.map(user =>
      prisma.address.create({
        data: {
          userId: user.id,
          label: 'Home',
          address: faker.location.streetAddress(),
          lat: (faker.location.latitude()),
          lng: (faker.location.longitude()),
        },
      })
    )
  );

  const restaurants = await Promise.all(
    [...Array(10)].map((_, i) =>
      prisma.restaurant.create({
        data: {
          name: `R${i}`,
          description: `Desc ${i}`,
          ownerId: users[0].id,
          managerId: users[2].id,
        },
      })
    )
  );

  const menuItems = await Promise.all(
    restaurants.map(r =>
      prisma.menuItem.create({
        data: {
          name: 'Burger',
          description: 'Delicious burger',
          price: 100 + Math.random() * 50,
          imageUrl: faker.image.url(),
          available: true,
          restaurantId: r.id,
        },
      })
    )
  );

  const discounts = await Promise.all(
    [...Array(10)].map((_, i) =>
      prisma.discount.create({
        data: {
          code: `CODE${i}`,
          type: i % 2 === 0 ? 'FLAT' : 'PERCENT',
          value: 10,
          minOrderAmount: 50,
          startDate: new Date(),
          endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
          isActive: true,
          usageLimit: 10,
        },
      })
    )
  );

  const orders = await Promise.all(
    [...Array(10)].map((_, i) =>
      prisma.order.create({
        data: {
          customerId: users[8].id,
          restaurantId: restaurants[i % restaurants.length].id,
          addressId: addresses[i % addresses.length].id,
          deliveryId: users[5].id,
          deliveryTime: new Date(Date.now() + 1000 * 60 * 30),
          status: 'PENDING',
          totalAmount: 200,
          discountId: discounts[i % discounts.length].id,
          discountAmount: 20,
          finalAmount: 180,
          otp: `${Math.floor(1000 + Math.random() * 9000)}`,
        },
      })
    )
  );

  await Promise.all(
    orders.map(order =>
      prisma.orderItem.create({
        data: {
          orderId: order.id,
          menuItemId: menuItems[order.id.charCodeAt(0) % menuItems.length].id,
          quantity: 1,
          price: 100,
        },
      })
    )
  );

  await Promise.all(
    orders.map(order =>
      prisma.payment.create({
        data: {
          orderId: order.id,
          method: 'ONLINE',
          type: 'COD',
          status: 'COMPLETED',
          transactionRef: faker.string.uuid(),
        },
      })
    )
  );

  await Promise.all(
    orders.map(order =>
      prisma.rating.create({
        data: {
          orderId: order.id,
          customerId: users[8].id,
          restaurantId: order.restaurantId,
          deliveryId: users[5].id,
          restaurantRating: 4,
          deliveryRating: 5,
          comment: 'Good service',
        },
      })
    )
  );

  await Promise.all(
    orders.map(order =>
      prisma.deliveryStatusLog.create({
        data: {
          orderId: order.id,
          deliveryId: users[5].id,
          status: 'ASSIGNED',
          timestamp: new Date(),
          note: 'Picked up',
        },
      })
    )
  );

  await Promise.all(
    orders.map(order =>
      prisma.deliveryOtp.create({
        data: {
          orderId: order.id,
          otp: order.otp,
          verified: true,
          verifiedAt: new Date(),
        },
      })
    )
  );

  console.log('✅ Seed completed');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
