CloudFlare as hosting solution

# Basic components
- [x] Cookies
	Just maaaybe there could be an issue with responsiveness, because inspecting it in mobile view on a mac showed that the text didn't fit and I couldn't see the button. It looked great in the iPhone tho, so I'll skip it for now. Added it to [[#Slice 2 Gather feedback from slice 1]]
- [x] Emails
	- [x] Set up a company email
		Bought an email at Hover.com. Tried using it, and for a week it would not send emails and sent emails to the email would bounce and not be sent. After reaching out to support, this is what they replied with, and I'm waiting for the DNS to finalize to confirm it works... fucking DNS and hosts and stuff, it's just all so convoluted
		The reason the email is not working is you do not have Hovers MX record (email record) in the DNS file. You will need to reach out to Cloudflare and have the following records added to the DNS:   
		MX record:  
		Hostname: @  
		Priority: 10  
		Target Host: [mx.hover.com.cust.hostedemail.com](http://mx.hover.com.cust.hostedemail.com/)  
	   
		HOVERS SPF Record:
		Hostname: @
		Record Type: TXT
		Value: v=spf1 [include:_spf.hostedemail.com](http://include:_spf.hostedemail.com/) ~all
	- [x] Send an email from BE
- [x] Event tracking
	- [x] FE
		Separate package with `init`, and 4 different methods ready for simple access
		- [x] FE -> BE with code, BE -> MixPanel with event
	- [x] BE
		Reusing the one from friendy-be
		Got a bit annoying with adding an extra folder with subpackage. The solution was to import it as `github.com/nazarnovak/go-boilerplate/package`
		Then have that `package` as package name + adding the folder itself to Dockerfile
- [x] Payment
	- [x] BE
		- [x] End point for FE that returns a secret (payment intent), which user will pay with in FE
	- [x] FE
		- [x] Get the payment intent secret for a fixed payment ($10)
			When pinging local BE - make sure to have `http://localhost:8080`. I didn't have `http://` and it was complaining about CORS
			For some reason GET to /payment needed a `Access-Control-Allow-Origin` header, but not POST. 
		- [x] Import the skin from Stripe
			Successfully copied from `friendy-fe` 8)
		- [x] Capture payment successfully with FE -> BE -> Stripe
			Works in production :D
- [x] Feedback form
	- [x] FE - modal with text, text input, textarea maybe, and send button that closes the modal
		Possible to add self-closing window with 3 second countdown + HTML email validation.
		Skipping for now to go to market faster
	- [x] BE - capture feedback and save it to DB
	- [x] FE -> DB chain confirmed
