import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { commerce } from '../../lib/commerce';
import FormInput from './CustomTextField';

const AddressForm = ({ checkoutToken, active, setStep, test }) => {
  const [shippingCountries, setShippingCountries] = useState({});
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');
  const methods = useForm();
  
  
  
  const fetchShippingCountries = async (checkoutTokenId) => {
  if (active ===0){
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
       
    console.log("FETCHING:"+JSON.stringify(countries))
  //  let countries = {"US":"United States"}
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[1]);
    
  }
     
    
     
  };
 

  const fetchSubdivisions = async (countryCode) => {
    //let testVar = {"CA":"Canada","US":"United States"}
    if(active===0){
      const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
      console.log("SUB:"+ JSON.stringify(subdivisions))
      //let subdivisions = {"AL":"Alabama","AK":"Alaska","AS":"American Samoa","AZ":"Arizona","AR":"Arkansas","CA":"California","CO":"Colorado","CT":"Connecticut","DE":"Delaware","DC":"District of Columbia","FL":"Florida","GA":"Georgia","GU":"Guam","HI":"Hawaii","ID":"Idaho","IL":"Illinois","IN":"Indiana","IA":"Iowa","KS":"Kansas","KY":"Kentucky","LA":"Louisiana","ME":"Maine","MD":"Maryland","MA":"Massachusetts","MI":"Michigan","MN":"Minnesota","MS":"Mississippi","MO":"Missouri","MT":"Montana","NE":"Nebraska","NV":"Nevada","NH":"New Hampshire","NJ":"New Jersey","NM":"New Mexico","NY":"New York","NC":"North Carolina","ND":"North Dakota","MP":"Northern Mariana Islands","OH":"Ohio","OK":"Oklahoma","OR":"Oregon","PA":"Pennsylvania","PR":"Puerto Rico","RI":"Rhode Island","SC":"South Carolina","SD":"South Dakota","TN":"Tennessee","TX":"Texas","UM":"United States Minor Outlying Islands","UT":"Utah","VT":"Vermont","VI":"Virgin Islands, U.S.","VA":"Virginia","WA":"Washington","WV":"West Virginia","WI":"Wisconsin","WY":"Wyoming"}
     setShippingSubdivisions(subdivisions);
     setShippingSubdivision(Object.keys(subdivisions)[0]);
    }
  
  };

  const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
    if(active===0){
      const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });
      console.log(JSON.stringify(options))
      //let options = [{"id":"ship_7ZAMo1b7M5NJ4x","description":"Domestic","price":{"raw":0,"formatted":"0.00","formatted_with_symbol":"$0.00","formatted_with_code":"0.00 USD"},"countries":["US"]}]
      setShippingOptions(options);
      setShippingOption(options[0].id);
    }

  };

  const changeStep = () =>{
setStep(1)
  }

  useEffect(() => {
   
    console.log("IN FIRST EFFECT CHECKOUT ID: "+ checkoutToken.id)
    if (active === 0) {
    fetchShippingCountries(checkoutToken.id);
  }

  return()=>{
    console.log("ACTIVE ON EXIT"+ active)
  }

  }, []);

  useEffect(() => {
   if(active===0){
    if (shippingCountry !=="") fetchSubdivisions(shippingCountry);
   }
    
    
 

  }, [shippingCountry]);

  useEffect(() => {
if(active===0){
  if (shippingSubdivision !=='') fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
}
  }, [shippingSubdivision]);

  function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
  return (
    <>
    {console.log("RETURNING:"+ JSON.stringify(shippingCountries))}
      <Typography variant="h6" gutterBottom>Shipping address</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => test({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First name" />
            <FormInput required name="lastName" label="Last name" />
            <FormInput required name="address1" label="Address line 1" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="City" />
            <FormInput required name="zip" label="Zip / Postal code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={isEmpty(shippingCountry) ? "":shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                {Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value={isEmpty(shippingSubdivision)? "":shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                {Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={isEmpty(shippingOption) ? "":shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
            <Button type="submit" variant="contained" color="primary">Next</Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};
export default AddressForm;



