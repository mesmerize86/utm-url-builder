import React from 'react';

import Header from './layout/header';
import Dropdown from '../shared-components/form-components/dropdown';
import TextField from '../shared-components/form-components/textfield';
import TrackingConfig from '../data/trackingConfig';
import { withState, withHandlers, compose } from 'recompose';
import DropdownContainer from '../ui-components/dropdown';
import { getParam, isEmpty } from '../shared-components/util/util';

import { campaignContent } from './contents';
import customPage from './custom-page';
import internalPage from './internal-page';

const Homepage = ({ itemListName, 
  sourceName, 
  mediumName, 
  content, 
  brandURL, 
  brandName,
  pageType,
  campaignID, 
  campaignURL,
  websiteURL,
  productPath,
  searchPath,
  contentBasedPath,
  offerPath,
  onKeyPress,
  onChangeBrand, 
  onChangeSource, 
  onChangeCampaign, 
  onChangePageType,
  onChangeMedium, 
  onChangeContent, 
  onChangeRecruitmentPage,
  onChangeProductPage,
  onChangeSearchPage,
  onChangeContentBasedPage,
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
        <option key={value.source} value={value.source}> { value.source }</option>
      ));
    
      let mediumSource = campaignMedium(sourceName, sourceConfig);
      mediumConfig = mediumSource.map(value => (
        <option key={value} value={value}> { value }</option>
      ));
    }

  if(getParam('custom')){
    campaignURL = `${websiteURL}&utm_source=${sourceName}&utm_medium=${mediumName}&utm_campaign=${campaignID}&utm_content=${content}`;
  }else {
    if(pageType === 'recruitment'){
      campaignURL = `offer=${offerPath}&utm_source=${sourceName}&utm_medium=${mediumName}&utm_campaign=${campaignID}&utm_content=${content}`;
    }else if(pageType === 'item_list'){
      campaignURL = `${brandURL}/jsp/offer/common/offer.jsp?name=${ itemListName }&promoCode=${campaignID}&utm_source=${sourceName}&utm_medium=${mediumName}&utm_campaign=${campaignID}&utm_content=${content}`;
    }else if(pageType === 'product'){
      campaignURL = `${brandURL}/${ productPath }?utm_source=${sourceName}&utm_medium=${mediumName}&utm_campaign=${campaignID}&utm_content=${content}`;
    }else if(pageType === 'search'){
      campaignURL = `${brandURL}/${ searchPath }?utm_source=${sourceName}&utm_medium=${mediumName}&utm_campaign=${campaignID}&utm_content=${content}`;
    }else if(pageType === 'content_based_page'){
      campaignURL = `${brandURL}/${ contentBasedPath }?utm_source=${sourceName}&utm_medium=${mediumName}&utm_campaign=${campaignID}&utm_content=${content}`; 
    }
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
                    <h1>Internal URL Builder</h1>
              }
              <div className="form-group">
                <a href="?custom=true" className="button button-default">Custom URL Builder</a>
                <a href="/html/content/cm/au/campaign-url-builder/" className="button button-primary">Internal URL Builder</a>
                <hr/>
              </div>
              <div className="form form-horizontal">
                { (getParam('custom')) ? 
                  customPage(onChangeWebsiteURL, onChangeSource, onChangeMedium) 
                  : 
                  internalPage(brandConfig, 
                    onChangeBrand, 
                    campaignConfig, 
                    onChangeSource, 
                    mediumConfig, 
                    onChangeMedium, 
                    pageType, 
                    onChangePageType, 
                    onChangeRecruitmentPage,
                    onChangeItemListName,
                    onChangeProductPage,
                    onChangeSearchPage,
                    onChangeContentBasedPage)
                }
                <TextField type="number" label="Campaign ID" placeholder="e.g. response code ( 2120001 )" length="7" handleChange={ onChangeCampaign } handleKeyPress={ onKeyPress }/>
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
  withState('pageType', 'setPageType', ''),
  withState('offerPath', 'setOfferPath', ''),
  withState('itemListName', 'setItemListName', ''),
  withState('productPath', 'setProductPage', ''),
  withState('searchPath', 'setSearchPath', ''),
  withState('contentBasedPath', 'setContentBasedPath', ''),
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
    onChangePageType : props => e => {
      e.preventDefault();
      props.setPageType(e.target.value);
    },
    onChangeProductPage : props => e => {
      e.preventDefault();
      props.setProductPage(e.target.value);
    },
    onChangeSearchPage : props => e => {
      e.preventDefault();
      props.setSearchPath(e.target.value);
    },
    onChangeContentBasedPage : props => e => {
      e.preventDefault();
      props.setContentBasedPath(e.target.value);
      console.log(e.target.value);
    },
    onKeyPress: props => e => {
      let length = e.target.getAttribute('maxlength'),
          value = e.target.value;      
      if(value.length >= length){
        e.preventDefault();
        return false;
      }
    },
    onChangeRecruitmentPage : props => e => {
      e.preventDefault();
      props.setOfferPath(e.target.value);
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

function campaignSource(brandURL) {
  let sources = {};
  TrackingConfig.forEach((value) =>{
    if(brandURL == value.url){
      sources = value.utm;
    }
  })
  return sources;
}

function campaignMedium(sourceName, sourceConfig) {
  let mediums = [];
  sourceConfig.forEach((value) => {
    if(sourceName == value.source){
      mediums = value.medium
    }
  })
return mediums;
}

export default enhance(Homepage);
