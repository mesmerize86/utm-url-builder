import React from 'react';

import Header from './layout/header';
import Dropdown from '../shared-components/form-components/dropdown';
import TextField from '../shared-components/form-components/textfield';
import TrackingConfig from '../data/trackingConfig';
import { withState, withHandlers, compose } from 'recompose';
import DropdownContainer from '../ui-components/dropdown';
import { getParam, isEmpty } from '../shared-components/util/util';

const Homepage = ({ itemListName, 
  sourceName, 
  mediumName, 
  content, 
  brandURL, 
  brandName,
  campaignID, 
  campaignURL,
  websiteURL,
  onChangeBrand, 
  onChangeSource, 
  onChangeCampaign, 
  onChangeMedium, 
  onChangeContent, 
  onChangeItemListName, 
  onChangeCampaignURL,
  onChangeWebsiteURL,
  copyTextHandler }) => {
    
    const brandConfig = TrackingConfig.map(key => {
      return (
        <option key={key.abbreviation} name={key.abbreviation} value={key.url}> {key.brandName} </option>
      )
    });
    
    let sourceConfig = campaignSource(brandURL);
    let campaignConfig, mediumConfig;

    if(!isEmpty(sourceConfig)){
      campaignConfig = sourceConfig.map(value => (
        <option key={value.name} value={value.name}> { value.name }</option>
      ));
    
      let mediumSource = campaignMedium(sourceName, sourceConfig);
      mediumConfig = mediumSource.map(value => (
        <option key={value} value={value}> { value }</option>
      ));
    }

  if(getParam('custom')){
    campaignURL = `${websiteURL}&utm_source=${sourceName}&utm_medium=${mediumName}&utm_campaign=${campaignID}&utm_content=${content}`;
  }else {
    campaignURL = `${brandURL}/jsp/offer/common/offer.jsp?name=${ itemListName }&promoCode=${campaignID}&utm_source=${sourceName}&utm_medium=${mediumName}&utm_campaign=${campaignID}&utm_content=${content}`;
  }


  return (
    <div className="wrapper page">
      <div className="homepage">
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h1 className="title">Laithwaite's Wine Campaign URL Builder</h1>
              <p>This tool allows you to easily add campaign parameters to URLs so you can track custom campaigns in google Analaytics.</p>
              {getParam('custom') ? 
                  <div>
                    <h1>Custom URL Builder</h1>
                    <p>Custom types url campaign may have many different sources like brand partners. </p>
                  </div> : 
                    <h1>Internal URL Builder</h1>}
              <div className="form-group">
                <a href="?custom=true" className="button button-default">Custom URL Builder</a>
                <a href="/" className="button button-primary">Internal URL Builder</a>
                <hr/>
              </div>
              <div className="form form-horizontal">
                { (getParam('custom')) ? 
                  customField(onChangeWebsiteURL, onChangeSource, onChangeMedium) 
                  : 
                  internalField(brandConfig, onChangeBrand, campaignConfig, onChangeSource, mediumConfig, onChangeMedium, onChangeItemListName, itemlistContent )
                }
                <TextField label="Campaign ID" placeholder="e.g. response code ( 2120001 )" handleChange={ onChangeCampaign }/>
                <TextField label="Campaign Content" placeholder="e.g. rec_control" handleChange={ onChangeContent }/>
                <DropdownContainer title="What is the campaign content?. Click here for more information." content={ campaignContent }/>
              </div>
              {
                (brandURL === '' && websiteURL === '') ? '' :
                <div className="form-group">
                  <input type="text" value={campaignURL} id="url" className="form-control custom-control"/>
                  <button onClick={ copyTextHandler } className="button button-secondary">Click to copy</button>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const enhance = compose (
  withState('sourceName', 'setSourceName', ''),
  withState('brandURL', 'setBrandURL', ''),
  withState('campaignID', 'setCampaignID', ''),
  withState('mediumName', 'setMediumName', ''),
  withState('itemListName', 'setItemListName', ''),
  withState('campaignURL', 'setCampaignURL', ''),
  withState('websiteURL', 'setWebsiteURL', ''),
  withState('content', 'setContent', ''),
  withHandlers({
    onChangeBrand: props => e => {
      e.preventDefault();
      props.setBrandURL(e.target.value);
    },
    onChangeSource : props => e => {
      e.preventDefault();
      props.setSourceName(e.target.value);
    },
    onChangeMedium : props => e => {
      e.preventDefault();
      props.setMediumName(e.target.value);
    },
    onChangeCampaign : props => e => {
      e.preventDefault();
      props.setCampaignID(e.target.value);
    },
    onChangeContent : props => e => {
      e.preventDefault();
      props.setContent(e.target.value);
    },
    onChangeItemListName : props => e => {
      e.preventDefault();
      props.setItemListName(e.target.value);
    },
    onChangeWebsiteURL: props => e => {
      e.preventDefault();
      props.setWebsiteURL(e.target.value);
    },
    copyTextHandler: props => e => {
      let campaignURL = document.getElementById("url");
      campaignURL.select();
      document.execCommand("copy");  
    }
  })
) 

const campaignContent = (
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
  
  const itemlistContent = (
    <div>
      <p>Item list Name is a landing page. In this field you have to copy the name of item list page. </p>
      <p>e.g. This is a url. 'https://www.winepeople.com.au/jsp/offer/common/offer.jsp?name=3935-champion-challenger'. </p>
      <p>Then item list name is <span className="prefix">3935-champion-challenger</span></p>
    </div>
  )
  
const internalField = ( brandConfig, onChangeBrand, campaignConfig, onChangeSource, mediumConfig, onChangeMedium, onChangeItemListName, itemlistContent  ) => {
  return (
    <div>
      <div className="form-group">
        <label className="form-label">Brand :</label>
        <Dropdown options = { brandConfig } handleChange={ onChangeBrand }/>
      </div>
      <div className="form-group">
        <label className="form-label">Campaign Source :</label>
        <Dropdown options = { campaignConfig } handleChange={ onChangeSource }/>
      </div>
      <div className="form-group">
        <label className="form-label">Campaign Medium :</label>
        <Dropdown options = { mediumConfig } handleChange={ onChangeMedium }/>
      </div>
      <TextField label="Itemlist Name" placeholder="e.g. 3935-champion-challenger" handleChange={ onChangeItemListName }/> 
      <DropdownContainer title="What is the item list name?. Click here for more information." content={itemlistContent}/>
    </div>
  )
}
const customField = (  onChangeWebsiteURL, onChangeSource, onChangeMedium ) => {
  return (
    <div>
      <TextField label="Website URL" placeholder="e.g. website url" handleChange={ onChangeWebsiteURL }/>
      <TextField label="Campaign Source" placeholder="e.g. brand name, facebook, google" handleChange={ onChangeSource }/>
      <TextField label="Campaign Medium" placeholder="e.g. email, print, cpc, banner, social, boost_cpc" handleChange={ onChangeMedium }/>
    </div>
  )
}

function campaignSource(brandURL) {
  let sources = {};
  TrackingConfig.forEach((value) =>{
    if(brandURL == value.url){
      sources = value.source;
    }
  })
  return sources;
}

function campaignMedium(sourceName, sourceConfig) {
  let mediums = [];
  sourceConfig.forEach((value) => {
    if(sourceName == value.name){
      mediums = value.medium
    }
  })
return mediums;
}

  export default enhance(Homepage);
