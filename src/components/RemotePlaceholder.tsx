type RemotePlaceholderProps = {
  name: string
  description?: string
}

export function RemotePlaceholder({ name, description }: RemotePlaceholderProps) {
  return (
    <section className="remote-placeholder">
      <h2>{name}</h2>
      <p>
        {description ??
          'Remote microfrontend not mounted yet. Configure Module Federation remotes to render the live experience.'}
      </p>
    </section>
  )
}

