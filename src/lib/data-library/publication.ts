export type DataLibraryPublicationResult = {
  status: "published"
  publishedAt: string
}

export interface DataLibraryPublicationAdapter {
  publish(changeRequestId: string): Promise<DataLibraryPublicationResult>
}

/**
 * Publication remains intentionally server-only and deferred until an approved
 * warehouse write path is available. Browser components must never implement
 * or invoke a BigQuery write directly.
 */
export class DeferredDataLibraryPublicationAdapter implements DataLibraryPublicationAdapter {
  async publish(_changeRequestId: string): Promise<DataLibraryPublicationResult> {
    throw new Error("Data Library publication is not configured")
  }
}
