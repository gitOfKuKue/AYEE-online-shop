import React from "react";

const ProcessFlowCards = () => {
  const processFlow = [
    {
      id: 1,
      title: "Browse Products",
      description: `Explore our wide collection of drinks, smoothies, and coffee options tailored to your taste. 
Filter by category, rating, or popularity to quickly discover what suits your mood. 
Each product is carefully sourced and described so you can make the best choice. 
Take your time and enjoy discovering new flavors and seasonal specials.`,
    },
    {
      id: 2,
      title: "Select Your Favorites",
      description: `Add the items you love to your cart and customize quantities to suit your needs. 
Whether you’re shopping for yourself or planning for a group, it’s easy to adjust. 
You can also save favorites to quickly reorder in the future. 
Our simple interface makes managing your selection effortless.`,
    },
    {
      id: 3,
      title: "Secure Checkout",
      description: `Proceed to checkout and complete your order using our fast, secure payment system. 
Choose from multiple payment options for your convenience and peace of mind. 
All transactions are protected with industry-standard encryption. 
Review your order summary before final confirmation to ensure everything is perfect.`,
    },
    {
      id: 4,
      title: "Enjoy Your Order",
      description: `Sit back while we prepare and deliver your fresh, delicious drinks straight to your door. 
Track your delivery in real time and know exactly when to expect your items. 
Your beverages are carefully packaged to arrive chilled and in perfect condition. 
Unwrap, pour, and savor every sip of your freshly delivered favorites.`,
    },
  ];
  return (
    <div className="flex justify-between items-center gap-5">
      {processFlow.map((el) => (
        <div key={el.id} className="bg-[#B0D4A7] border border-border p-5 rounded-md min-h-90 w-100">
          <h1 className="text-2xl text-font2 font-bold mb-2">
            {el.title}
          </h1>
          <p className="text-font2-light text-lg">{el.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ProcessFlowCards;
