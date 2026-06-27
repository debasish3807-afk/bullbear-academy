interface EmptyStateProps {
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-card border border-dashed border-line bg-bg-card/50 p-8 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && <p className="mt-2 text-sm text-text-secondary">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
