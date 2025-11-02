// Dynamic form with field arrays (add/remove fields)
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Define schema for dynamic items
const itemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  role: z.enum(['admin', 'editor', 'viewer']),
})

const formSchema = z.object({
  projectName: z.string().min(1, 'Project name is required'),
  description: z.string().optional(),
  members: z.array(itemSchema).min(1, 'At least one member is required'),
})

type FormData = z.infer<typeof formSchema>

export function DynamicForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: '',
      description: '',
      members: [{ name: '', email: '', role: 'viewer' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members',
  })

  const onSubmit = async (data: FormData) => {
    try {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      alert('Project created successfully!')
    } catch (error) {
      console.error('Submission error:', error)
      alert('Failed to create project')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Project Info */}
      <fieldset>
        <legend>Project Information</legend>

        <div className="form-field">
          <label htmlFor="projectName">Project Name *</label>
          <input id="projectName" {...register('projectName')} />
          {errors.projectName && (
            <span role="alert">{errors.projectName.message}</span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="description">Description</label>
          <textarea id="description" {...register('description')} rows={3} />
        </div>
      </fieldset>

      {/* Dynamic Members */}
      <fieldset>
        <legend>Team Members</legend>

        {fields.map((field, index) => (
          <div key={field.id} className="dynamic-item">
            <div className="item-header">
              <h4>Member {index + 1}</h4>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  aria-label={`Remove member ${index + 1}`}
                >
                  Remove
                </button>
              )}
            </div>

            <div className="item-fields">
              <div className="form-field">
                <label htmlFor={`members.${index}.name`}>Name *</label>
                <input
                  id={`members.${index}.name`}
                  {...register(`members.${index}.name`)}
                />
                {errors.members?.[index]?.name && (
                  <span role="alert">
                    {errors.members[index]?.name?.message}
                  </span>
                )}
              </div>

              <div className="form-field">
                <label htmlFor={`members.${index}.email`}>Email *</label>
                <input
                  id={`members.${index}.email`}
                  type="email"
                  {...register(`members.${index}.email`)}
                />
                {errors.members?.[index]?.email && (
                  <span role="alert">
                    {errors.members[index]?.email?.message}
                  </span>
                )}
              </div>

              <div className="form-field">
                <label htmlFor={`members.${index}.role`}>Role *</label>
                <select
                  id={`members.${index}.role`}
                  {...register(`members.${index}.role`)}
                >
                  <option value="viewer">Viewer</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
          </div>
        ))}

        {errors.members && typeof errors.members.message === 'string' && (
          <span role="alert" className="error">
            {errors.members.message}
          </span>
        )}

        <button
          type="button"
          onClick={() => append({ name: '', email: '', role: 'viewer' })}
          className="add-button"
        >
          Add Member
        </button>
      </fieldset>

      {/* Submit */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Project'}
      </button>
    </form>
  )
}
