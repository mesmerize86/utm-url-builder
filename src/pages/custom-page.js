import React from 'react';
import TextField from '../shared-components/form-components/textfield';

const customPage = (  onChangeWebsiteURL, onChangeSource, onChangeMedium, onChangeOfferPath ) => {
  return (
    <div>
      <TextField label="Website URL" placeholder="e.g. website url" handleChange={ onChangeWebsiteURL }/>
      <TextField label="Campaign Source" placeholder="e.g. brand name, facebook, google" handleChange={ onChangeSource }/>
      <TextField label="Campaign Medium" placeholder="e.g. email, print, cpc, banner, social, boost_cpc" handleChange={ onChangeMedium }/>
    </div>
  )
}

export default customPage;