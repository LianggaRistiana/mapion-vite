import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { Control } from "react-hook-form"

type Props = {
  fields: FieldConfig[]
  control: Control<any>
}

export default function FormFields({ fields, control }: Props) {
  return (
    <>
      {fields.map((field) => (
        <FormField
          key={field.name}
          control={control}
          name={field.name}
          render={({ field: inputField }) => (
            <FormItem>
              <FormLabel>{field.label}</FormLabel>
              <FormControl>
                <Input
                  {...inputField}
                  placeholder={field.placeholder}
                  type={field.type || "text"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </>
  )
}
