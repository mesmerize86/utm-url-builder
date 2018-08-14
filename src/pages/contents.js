import React from 'react';

export const campaignContent = (
  <div>
    <p>Tag to define the call-to-action or ad headline – should be prefixed with Marketing Channel reference:</p><p><strong>Email</strong> : <span className="prefix">edm_ </span><em>e.g. edm_medal_winning_mix</em></p>
    <p><strong>Recruitment</strong>: <span className="prefix">recr_ </span><em>e.g. rec_control</em></p>
    <p><strong>Walk to Web</strong>: <span className="prefix">w2w_</span> <em>e.g. w2w_varietal</em></p>
    <p><strong>Main Mailing</strong>: <span className="prefix">mm_ </span><em>e.g. mm_control</em></p>
    <p>rec_ w2w_ mm_ edm_ if applicable e.g. for an A/B test rec_20_off & rec_3000_points.</p> 
      <p>If just one campaign use a single reference e.g. edm_jumbo_reds or mm_cat_autumn</p>
      <a href="http://dwwiki/display/APACO/Campaign+UTM+Tracking+for+Website+Traffic" target="_blank">Click here for more details.</a>
  </div>
)
  
export const itemlistContent = (
  <div>
    <p>Landing Page Name is an item list page name. In this field you have to copy the name of item list page. </p>
    <p>e.g. This is a url. 'https://www.winepeople.com.au/jsp/offer/common/offer.jsp?name=3935-champion-challenger'. </p>
    <p>Then item list name is <span className="prefix">3935-champion-challenger</span></p>
  </div>
)
    
  