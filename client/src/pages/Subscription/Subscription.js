import React, { useState, useEffect } from 'react';
import './Subscription.css'; // Add custom styles for this page
import Layout from '../../components/Layout/Layout';

const Subscription = () => {
  const [subscribed, setSubscribed] = useState(false);

  // Fetch subscription status from the backend when the component loads
  useEffect(() => {
    const userId = 1; // Replace with actual userId (from state or props)
    
    const fetchSubscriptionStatus = async () => {
      try {
        const response = await fetch(`http://localhost:5279/api/users/${userId}`);
        const data = await response.json();

        // Check if the user is subscribed (subscription_status = 1)
        if (data.subscription_status === 1) {
          setSubscribed(true);
        }
      } catch (error) {
        console.error("Error fetching subscription status:", error);
      }
    };

    fetchSubscriptionStatus();
  }, []);

  const handleSubscribe = async () => {
    if (!subscribed) {
      try {
        const userId = 1; // Replace with actual userId
        const response = await fetch(`http://localhost:5279/api/users/${userId}?columnName=subscription_status&newValue=1`, {
          method: 'PUT',
        });

        if (response.ok) {
          setSubscribed(true);
          alert('You have successfully subscribed!');
        } else {
          alert('Failed to subscribe.');
        }
      } catch (error) {
        console.error("Error subscribing:", error);
        alert('Error subscribing. Please try again later.');
      }
    }
  };

  return (
    <Layout>
      <div className="subscription-container">
        <h1>Exclusive Subscription Plan</h1>
        <div className="subscription-card">
          <h3>Premium Access</h3>
          <p className="price">$25/month</p>
          <ul className="features-list">
            <li>Access to all premium features</li>
            <li>Ad-free experience</li>
            <li>Priority customer support</li>
            <li>Exclusive content and offers</li>
          </ul>
          <button 
            onClick={handleSubscribe} 
            className={`subscribe-btn ${subscribed ? 'subscribed' : ''}`}
            disabled={subscribed}
          >
            {subscribed ? 'Subscribed' : 'Subscribe Now'}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Subscription;
