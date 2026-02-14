interface FieldErrorLike {
  message?: string;
}

function getErrorMessage(error: unknown): string | undefined {
  if (typeof error === "string") return error;

  if (error && typeof error === "object") {
    if ("message" in error && typeof error.message === "string") {
      return error.message;
    }

    if ("issues" in error && Array.isArray(error.issues)) {
      const issueMessages = error.issues
        .map((issue) => {
          if (
            issue &&
            typeof issue === "object" &&
            "message" in issue &&
            typeof issue.message === "string"
          ) {
            return issue.message;
          }

          return undefined;
        })
        .filter(Boolean) as string[];

      if (issueMessages.length > 0) {
        return issueMessages.join(", ");
      }
    }
  }

  return undefined;
}

export function toFieldErrors(errors: unknown[]): FieldErrorLike[] {
  const messages = errors
    .map((error) => getErrorMessage(error))
    .filter(Boolean) as string[];

  return [...new Set(messages)].map((message) => ({ message }));
}
