import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, Resolver, useFieldArray, useForm } from 'react-hook-form';
import {
  workspaceCreateFormSchema,
  WorkspaceCreateFormSchema,
  workspaceCreateToApiSchema,
} from '@/lib/schema';
import { Room, RoomType } from '@/lib/type';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '../hooks/useAuth';
import { useCreateWorkspace } from '../app/(admin)/_api/mutation';

function CreateWorkspaceFormModal({ onClose }: { onClose: () => void }) {
  const form = useForm<WorkspaceCreateFormSchema>({
    resolver: zodResolver(
      workspaceCreateFormSchema
    ) as Resolver<WorkspaceCreateFormSchema>,
    defaultValues: {
      name: '',
      capacity: 1,
      amenities: [],
      pricePerDay: 1,
      type: undefined,
      address: '',
      images: [],
      description: '',
    },
  });

  const { mutate: create } = useCreateWorkspace();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const {
    fields: amenityFields,
    append: appendAmenity,
    remove: removeAmenity,
  } = useFieldArray({
    control,
    name: 'amenities',
  });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: 'images',
  });

  const onSubmit = (data: WorkspaceCreateFormSchema) => {
    const formated = workspaceCreateToApiSchema.parse(data);
    create(formated);
    onClose?.();
    form.reset();
  };

  return (
    <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
      <form id="workspace-edit-form" onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
          <DialogDescription>
            Make changes to the workspace here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup className="grid md:grid-cols-2 gap-4 py-4">
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input {...field} placeholder="Workspace Name" />
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />
          <Controller
            name="capacity"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Capacity</FieldLabel>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  placeholder="Capacity"
                />
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          <Controller
            name="pricePerDay"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Price Per Day</FieldLabel>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  placeholder="Price"
                />
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          <Controller
            name="type"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Room Type</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Room Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={RoomType.MEETING_ROOM}>
                      Meeting Room
                    </SelectItem>
                    <SelectItem value={RoomType.PRIVATE_OFFICE}>
                      Private Office
                    </SelectItem>
                    <SelectItem value={RoomType.PODCAST_STUDIO}>
                      Podcast Studio
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          <Controller
            name="address"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="md:col-span-2">
                <FieldLabel>Address</FieldLabel>
                <Input {...field} placeholder="Address" />
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="md:col-span-2">
                <FieldLabel>Description</FieldLabel>
                <Textarea
                  {...field}
                  placeholder="Workspace description"
                  rows={3}
                />
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          {/* AMENITIES – dynamic array */}
          <Field className="md:col-span-2">
            <FieldLabel>Amenities</FieldLabel>
            <div className="space-y-2">
              {amenityFields.map((amenity, index) => (
                <div key={amenity.id} className="flex gap-2">
                  <Input
                    {...form.register(`amenities.${index}.name` as const)}
                    placeholder="Amenity (e.g. WiFi)"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeAmenity(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendAmenity({ name: 'WIFI' })}
              >
                + Add amenity
              </Button>
            </div>
            <FieldError>{errors.amenities?.message as string}</FieldError>
          </Field>

          {/* IMAGES – dynamic array of URLs */}
          <Field className="md:col-span-2">
            <FieldLabel>Images (URLs)</FieldLabel>
            <div className="space-y-2">
              {imageFields.map((image, index) => (
                <div key={image.id} className="flex gap-2">
                  <Input
                    {...form.register(`images.${index}.url` as const)}
                    placeholder="https://example.com/image.jpg"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeImage(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendImage({ url: '' })}
              >
                + Add image
              </Button>
            </div>
            <FieldError>{errors.images?.message as string}</FieldError>
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

export default CreateWorkspaceFormModal;
