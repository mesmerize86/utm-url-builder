import React from 'react';
import Dropdown from '../shared-components/form-components/dropdown';
import TextField from '../shared-components/form-components/textfield';
import {recruitmentPage, itemListPage, productPage, searchResultPage, contentBasedPage} from './campaign-page-type';

const internalPage = ( brandConfig, onChangeBrand, campaignConfig, onChangeSource, mediumConfig, onChangeMedium, pageType, onChangePageType, onChangeRecruitmentPage, onChangeItemListName, onChangeProductPage, onChangeSearchPage, onChangeContentBasedPage) => {
  const conditionBasedPage = (pageType)=> {
    if(pageType !== ''){
      switch(pageType){
        case 'recruitment' : return recruitmentPage(onChangeRecruitmentPage);
        case 'item_list' : return itemListPage(onChangeItemListName);
        case 'product' : return productPage(onChangeProductPage);
        case 'search' : return searchResultPage(onChangeSearchPage);
        case 'content_based_page' : return contentBasedPage(onChangeContentBasedPage);
      }
    }
  }
  
  return (
    <div>
      <div className="form-group">
        <label className="form-label">Brand :</label>
        <Dropdown options = { brandConfig } handleChange={ onChangeBrand }/>
      </div>
      <div className="form-group">
        <label className="form-label">Page Type :</label>
        <select className="form-control form-controlSelect" defaultValue="" onChange={ onChangePageType }>  
          <option value="">Please select options</option>
          <option value="recruitment">Recruitment Landing Page</option>
          <option value="item_list">Item List Page</option>
          <option value="product">Product Page</option>
          <option value="search">Search Page</option>
          <option value="content_based_page">Content Based Page</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Campaign Source :</label>
        <Dropdown options = { campaignConfig } handleChange={ onChangeSource }/>
      </div>
      <div className="form-group">
        <label className="form-label">Campaign Medium :</label>
        <Dropdown options = { mediumConfig } handleChange={ onChangeMedium }/>
      </div>
      { conditionBasedPage(pageType) }
    </div>
  )
};

export default internalPage;