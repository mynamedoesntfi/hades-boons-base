import { Component, type ReactNode } from 'react'
import { RemotePlaceholder } from './RemotePlaceholder'

type RemoteErrorBoundaryProps = {
  name: string
  children: ReactNode
}

type RemoteErrorBoundaryState = {
  hasError: boolean
  errorMessage?: string
}

export class RemoteErrorBoundary extends Component<
  RemoteErrorBoundaryProps,
  RemoteErrorBoundaryState
> {
  state: RemoteErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(error: Error): RemoteErrorBoundaryState {
    return { hasError: true, errorMessage: error?.message }
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error(`[RemoteErrorBoundary] Failed to render remote "${this.props.name}"`, {
      error,
      errorInfo,
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <RemotePlaceholder
          name={`${this.props.name} unavailable`}
          description="We could not load this microfrontend right now. Try again or check remote configuration."
        >
          {this.state.errorMessage && <small>{this.state.errorMessage}</small>}
        </RemotePlaceholder>
      )
    }

    return this.props.children
  }
}

