import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type React from "react" // Added import for React

interface AddressData {
  street: string
  city: string
  state: string
  country: string
  postalCode: string
}

interface AddressFormProps {
  data: AddressData
  onUpdate: (data: AddressData) => void
}

export function AddressForm({ data, onUpdate }: AddressFormProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onUpdate({ ...data, [name]: value })
  }

  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Label htmlFor="street">Street Address</Label>
          <Input
            id="street"
            name="street"
            value={data.street}
            onChange={handleInputChange}
            className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
          />
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={data.city}
            onChange={handleInputChange}
            className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
          />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            name="state"
            value={data.state}
            onChange={handleInputChange}
            className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
          />
        </div>
        <div>
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input
            id="postalCode"
            name="postalCode"
            value={data.postalCode}
            onChange={handleInputChange}
            className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
          />
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            name="country"
            value={data.country}
            onChange={handleInputChange}
            className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
          />
        </div>
      </div>
    </form>
  )
}

