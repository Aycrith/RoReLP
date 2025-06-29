import { useFormContext } from 'react-hook-form';
import { FormInput, FormSelect, FormCheckbox, FormRadioGroup } from '@/components/ui/FormFields';
import { US_STATES, CONTACT_METHODS } from '@/lib/constants/form';

export const ContactInfoSection = () => {
  const { watch } = useFormContext();
  const billingAddressSame = watch('billingAddressSame', true);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
      <p className="text-gray-600">Please provide your contact details so we can get in touch with you.</p>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormInput
          name="fullName"
          label="Full Name"
          placeholder="John Doe"
          required
        />
        
        <FormInput
          name="email"
          type="email"
          label="Email Address"
          placeholder="john@example.com"
          required
        />
        
        <FormInput
          name="phone"
          type="tel"
          label="Phone Number"
          placeholder="(555) 123-4567"
          required
        />
        
        <div className="sm:col-span-2">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Mailing Address</h3>
          <div className="space-y-4">
            <FormInput
              name="address.street"
              label="Street Address"
              placeholder="123 Main St"
              required
            />
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <FormInput
                name="address.city"
                label="City"
                placeholder="Orlando"
                required
              />
              
              <FormSelect
                name="address.state"
                label="State"
                options={US_STATES.map(state => ({
                  value: state.abbreviation,
                  label: state.name
                }))}
                defaultValue="FL"
                required
              />
              
              <FormInput
                name="address.zipCode"
                label="ZIP Code"
                placeholder="32801"
                required
              />
            </div>
          </div>
        </div>
        
        <div className="sm:col-span-2">
          <FormCheckbox
            name="billingAddressSame"
            label="Billing address is the same as mailing address"
          />
        </div>
        
        {!billingAddressSame && (
          <div className="sm:col-span-2">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Billing Address</h3>
            <div className="space-y-4">
              <FormInput
                name="billingAddress.street"
                label="Street Address"
                placeholder="123 Billing St"
                required={!billingAddressSame}
              />
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormInput
                  name="billingAddress.city"
                  label="City"
                  placeholder="Orlando"
                  required={!billingAddressSame}
                />
                
                <FormSelect
                  name="billingAddress.state"
                  label="State"
                  options={US_STATES.map(state => ({
                    value: state.abbreviation,
                    label: state.name
                  }))}
                  defaultValue="FL"
                  required={!billingAddressSame}
                />
                
                <FormInput
                  name="billingAddress.zipCode"
                  label="ZIP Code"
                  placeholder="32801"
                  required={!billingAddressSame}
                />
              </div>
            </div>
          </div>
        )}
        
        <div className="sm:col-span-2">
          <FormRadioGroup
            name="preferredContactMethod"
            label="Preferred Contact Method"
            options={CONTACT_METHODS}
            required
          />
        </div>
      </div>
    </div>
  );
};
