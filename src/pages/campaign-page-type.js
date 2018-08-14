import React from 'react';
import TextField from '../shared-components/form-components/textfield';
import DropdownContainer from '../ui-components/dropdown';
import { itemlistContent } from './contents';


export const recruitmentPage = ( onChangeRecruitmentPage )=> (
  <div className="util-highlight">
    <TextField label="Offer Path" placeholder="e.g. 2018/july/4041001" handleChange={ onChangeRecruitmentPage }/>
  </div>
)
export const itemListPage = ( onChangeItemListName )=> (
  <div className="util-highlight">
    <TextField label="Landing page Name" placeholder="e.g. 3935-champion-challenger" handleChange={ onChangeItemListName }/> 
    <DropdownContainer title="What is the landing page name?. Click here for more information." content={itemlistContent}/>
  </div>
)

export const productPage = ( onChangeProductPage )=> (
  <div className="util-highlight">
    <TextField label="Product Page" placeholder="e.g. /product/RedHeads-Favourites-Dozen/M08994" handleChange={ onChangeProductPage }/>
  </div>
)

export const searchResultPage = ( onChangeSearchPage )=> (
  <div className="util-highlight">
    <TextField label="Search Path" placeholder="e.g. /wines/_/N-10" handleChange={ onChangeSearchPage }/>
  </div>
)

export const contentBasedPage = ( onChangeContentBasedPage )=> (
  <div className="util-highlight">
    <TextField label="Content Based Page" placeholder="e.g. /jsp/customerservice/au/common/delivery.jsp " handleChange={ onChangeContentBasedPage }/>
  </div>
)