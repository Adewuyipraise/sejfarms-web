import { FileText, ExternalLink } from "lucide-react";
import type { InstitutionReview } from "@/types";

export function InstitutionReviewCard({ review }: { review: InstitutionReview }) {
  return (
    <div className="flex flex-col rounded-card border border-border bg-white p-6">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
          <FileText className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-display text-h4 font-semibold text-charcoal">
            {review.institution}
          </h3>
          {review.faculty && (
            <p className="text-xs text-muted">{review.faculty}</p>
          )}
          <p className="text-sm font-medium text-brand">{review.department}</p>
        </div>
      </div>

      <p className="mt-4 flex-1 text-sm text-muted">{review.summary}</p>

      {review.pdfUrl ? (
        <a
          href={review.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
        >
          View Original Letter
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      ) : (
        <p className="mt-6 text-xs text-muted">
          Original letter available on request.
        </p>
      )}
    </div>
  );
}