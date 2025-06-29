import { useFormContext, useWatch } from 'react-hook-form';
import { FormInput, FormSelect } from '@/components/ui/FormFields';
import { EQUIPMENT_TYPES } from '@/lib/constants/form';

export const EquipmentInfoSection = () => {
  const { control } = useFormContext();
  const equipmentType = useWatch({ control, name: 'equipmentType' });
  
  const equipmentOptions = EQUIPMENT_TYPES.map(type => ({
    value: type,
    label: type,
  }));

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Equipment Information</h2>
      <p className="text-gray-600">Tell us about the equipment that needs service.</p>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <FormSelect
            name="equipmentType"
            label="Type of Equipment"
            options={equipmentOptions}
            required
            placeholder="Select equipment type"
          />
        </div>
        
        {equipmentType === 'Other' && (
          <div className="sm:col-span-2">
            <FormInput
              name="equipmentTypeOther"
              label="Please specify equipment type"
              placeholder="Enter equipment type"
              required={equipmentType === 'Other'}
            />
          </div>
        )}
        
        <FormInput
          name="makeBrand"
          label="Make/Brand"
          placeholder="e.g., Honda, Toro, Stihl"
          required
        />
        
        <FormInput
          name="modelNumber"
          label="Model Number"
          placeholder="e.g., HRX217VKA"
          required
        />
        
        <FormInput
          name="serialNumber"
          label="Serial Number"
          placeholder="Can usually be found on a metal plate"
          required
        />
        
        <FormInput
          name="yearOfManufacture"
          label="Year of Manufacture"
          type="number"
          min="1900"
          max={new Date().getFullYear() + 1}
          placeholder="e.g., 2020"
          required
        />
      </div>
    </div>
  );
};
