import type { ReactNode } from 'react'

type RemotePlaceholderProps = {
  name: string
  description?: string
  children?: ReactNode
}

export function RemotePlaceholder({ name, description, children }: RemotePlaceholderProps) {
  return (
    <section className="remote-placeholder">
      <h2>{name}</h2>
      <p>
        {description ??
          'Remote microfrontend not mounted yet. Configure Module Federation remotes to render the live experience.'}
      </p>
      {children}
    </section>
  )
}

