import React from 'react';
import {Accordion, AccordionItem} from "@nextui-org/react";
import Header from './Header';

const Accordian = () => {
    return (
        <>
        <Header title={'Are you a seller looking to join our platform? Here’s what you need to know.'} />
           <section className="mx-[100px]" >
           <Accordion variant="bordered">
      <AccordionItem key="1" aria-label="Accordion 1" title="Getting Started">
        Welcome to our Multi-Vendor Medicine Selling E-commerce Platform! Here's a quick guide to help you get started:
        <ul>
          <li><strong>Sign Up / Log In:</strong> Create an account or log in using your email or social media accounts.</li>
          <li><strong>Browse Products:</strong> Explore our wide range of medicines and healthcare products by category or use the search function.</li>
          <li><strong>Add to Cart:</strong> Select the medicines you need and add them to your cart. You can view your selected items anytime by clicking the cart icon.</li>
          <li><strong>Checkout:</strong> Proceed to checkout, enter your shipping information, and make a secure payment using Stripe.</li>
          <li><strong>Receive Your Order:</strong> Sit back and relax while we process and deliver your order to your doorstep.</li>
        </ul>
        Need more help? Visit our FAQ section or contact our support team.
      </AccordionItem>
      <AccordionItem key="2" aria-label="Accordion 2" title="Information for Sellers">
        Are you a seller looking to join our platform? Here’s what you need to know:
        <ul>
          <li><strong>Registration:</strong> Sign up as a seller by selecting the "Seller" role during registration. You’ll need to provide some additional information about your business.</li>
          <li><strong>Product Management:</strong> Once registered, you can add, update, and manage your products through your seller dashboard. Include details such as name, description, price, and images.</li>
          <li><strong>Order Handling:</strong> Manage your orders efficiently from the dashboard. Keep track of pending and completed orders and update the status as necessary.</li>
          <li><strong>Advertising:</strong> Promote your products by submitting them for advertisement. Increase visibility by having your products featured in our homepage slider.</li>
          <li><strong>Payments:</strong> View your payment history and manage pending payments. Ensure timely delivery to maintain a positive reputation and receive prompt payments.</li>
        </ul>
        Join us today and reach a wider audience with our multi-vendor platform.
      </AccordionItem>
      <AccordionItem key="3" aria-label="Accordion 3" title="Safety and Security Measures">
        Your safety and security are our top priorities. Here’s how we ensure a secure shopping experience:
        <ul>
          <li><strong>Secure Payments:</strong> All transactions are processed through Stripe, a leading payment gateway known for its security and reliability.</li>
          <li><strong>Data Protection:</strong> We use advanced encryption methods to protect your personal information and ensure it is not shared with third parties.</li>
          <li><strong>Verified Sellers:</strong> All sellers on our platform are thoroughly vetted to ensure they meet our quality standards and regulatory requirements.</li>
          <li><strong>Customer Reviews:</strong> Read reviews from other customers to make informed decisions about your purchases. Honest feedback helps maintain transparency and trust.</li>
          <li><strong>Responsive Support:</strong> Our support team is available to assist you with any concerns or issues you may have. Contact us via email or chat for prompt assistance.</li>
        </ul>
        Shop with confidence knowing that we are committed to providing a safe and secure e-commerce environment.
      </AccordionItem>
    </Accordion>
           </section> 
        </>
    );
};

export default Accordian;
