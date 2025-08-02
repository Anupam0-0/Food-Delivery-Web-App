to be added...
1. address routes -> CRUD for user 

2. order routes -> CRUD for orders 
- for user -->  place an order, get all orders(history), get single order, update, delete && get all items in an order, update quantity or cancel 

3. Delivery -> CRUD assign driver, update status log, verify otp and mark delivered

4. Rating routes ->  give rating, view all ratings, view my ratings(customer), update ratings, delete

5. Discount routes -> CRUD all by admin n manager
6. Payment routes -> initiate paymeny, get status
7. Delivery status log 

Middleware: 
- authenticate 
- roleGuard (...)
- isOwner



to be updated....

✅ Address Routes
Method	Endpoint	Description	Access	Middleware
POST	/api/addresses	Add new address	Customer	authenticate
GET	/api/addresses	Get user's addresses	Customer	authenticate
PUT	/api/addresses/:id	Update address	Customer	authenticate
DELETE	/api/addresses/:id	Delete address	Customer	authenticate

✅ Order Routes
Method	Endpoint	Description	Access	Middleware
POST	/api/orders	Place an order	Customer	authenticate, roleGuard('CUSTOMER')
GET	/api/orders	Get all orders (self)	All roles	authenticate
GET	/api/orders/:id	Get single order	Related user	authenticate
PUT	/api/orders/:id	Update order status	Manager/Admin	authenticate, roleGuard('MANAGER', 'ADMIN')
DELETE	/api/orders/:id	Cancel order	Customer	authenticate, roleGuard('CUSTOMER')

✅ Order Item Routes (optional, mostly internal)
Method	Endpoint	Description	Access	Middleware
GET	/api/orders/:id/items	Get order items	Related	authenticate
PUT	/api/order-items/:id	Update quantity	Internal	authenticate

✅ Delivery Routes
Method	Endpoint	Description	Access	Middleware
GET	/api/delivery/orders	Assigned orders to delivery	Delivery	authenticate, roleGuard('DELIVERY')
POST	/api/delivery/:id/status	Update delivery status log	Delivery	authenticate, roleGuard('DELIVERY')
POST	/api/delivery/:id/verify-otp	Verify OTP & mark delivered	Delivery	authenticate, roleGuard('DELIVERY')

✅ Rating Routes
Method	Endpoint	Description	Access	Middleware
POST	/api/ratings	Give rating	Customer	authenticate, roleGuard('CUSTOMER')
GET	/api/ratings	View ratings (all)	Public	–
GET	/api/ratings/my	View my ratings	Customer	authenticate

✅ Discount Routes
Method	Endpoint	Description	Access	Middleware
POST	/api/discounts	Create discount	Admin	authenticate, roleGuard('ADMIN')
GET	/api/discounts	Get all active discounts	Public	–
PUT	/api/discounts/:id	Update discount	Admin	authenticate, roleGuard('ADMIN')
DELETE	/api/discounts/:id	Delete discount	Admin	authenticate, roleGuard('ADMIN')

✅ Payment Routes
Method	Endpoint	Description	Access	Middleware
POST	/api/payments/:orderId	Initiate payment	Customer	authenticate
GET	/api/payments/:orderId	Get payment status	Customer	authenticate

✅ Delivery Status Logs
Method	Endpoint	Description	Access	Middleware
GET	/api/orders/:id/delivery-logs	Get delivery status logs	Related	authenticate

🧱 Middleware Summary
authenticate → Verifies JWT, attaches req.user

roleGuard(...roles) → Restricts access based on user role

isOwner (optional) → Use on update/delete if entity has ownerId

