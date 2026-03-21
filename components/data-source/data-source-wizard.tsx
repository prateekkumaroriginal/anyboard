"use client";

import { useEffect, useMemo, useState } from "react";
import type { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import {
  AUTH_TYPE_OPTIONS,
  HTTP_METHOD_OPTIONS,
  RESPONSE_TYPE_OPTIONS,
  DATA_SOURCE_STEP_TITLES,
} from "@/lib/constants";
import { extractDataAtPath } from "@/lib/data-utils";
import {
  dataSourceSchema,
  DataSourceFormValues,
  KeyValuePair,
} from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { KeyValueEditor } from "@/components/data-source/key-value-editor";
import {
  ConnectionTestResult,
  ConnectionTestState,
} from "@/components/data-source/connection-test-result";

interface DataSourceWizardProps {
  projectId: string;
  onCancel: () => void;
  onSuccess: () => void;
}

type DataSourceFormInputValues = z.input<typeof dataSourceSchema>;

const DEFAULT_VALUES: DataSourceFormValues = {
  name: "",
  config: {
    url: "",
    method: "GET",
    responseType: "array",
    headers: [],
    authType: "none",
    authConfig: {
      keyName: "",
      keyValue: "",
      location: "header",
      token: "",
      username: "",
      password: "",
    },
    queryParams: [],
    body: "",
    responseDataPath: "",
  },
};

function toRecord(pairs: KeyValuePair[]): Record<string, string> | undefined {
  const value = pairs.reduce<Record<string, string>>((acc, pair) => {
    const key = pair.key.trim();
    if (!key) return acc;
    acc[key] = pair.value;
    return acc;
  }, {});
  return Object.keys(value).length > 0 ? value : undefined;
}

export function DataSourceWizard({
  projectId,
  onCancel,
  onSuccess,
}: DataSourceWizardProps) {
  const createDataSource = useMutation(api.dataSources.create);
  const testConnection = useAction(api.dataSources.testConnection);

  const [step, setStep] = useState(1);
  const [isTesting, setIsTesting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResult, setTestResult] = useState<ConnectionTestState | null>(null);

  const form = useForm<
    DataSourceFormInputValues,
    unknown,
    DataSourceFormValues
  >({
    resolver: zodResolver(dataSourceSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onTouched",
  });

  useEffect(() => {
    form.reset(DEFAULT_VALUES);
    setStep(1);
    setTestResult(null);
  }, [form]);

  const responseDataPath = form.watch("config.responseDataPath");
  const watchedName = form.watch("name");
  const watchedUrl = form.watch("config.url");
  const watchedMethod = form.watch("config.method");
  const watchedResponseType = form.watch("config.responseType");
  const watchedBody = form.watch("config.body");
  const watchedAuthType = form.watch("config.authType");
  const watchedAuthConfig = form.watch("config.authConfig");

  const isCurrentStepValid = useMemo(() => {
    const hasValidUrl = (() => {
      if (!watchedUrl?.trim()) return false;
      try {
        new URL(watchedUrl.trim());
        return true;
      } catch {
        return false;
      }
    })();

    const hasValidPostBody = (() => {
      if (watchedMethod !== "POST") return true;
      const trimmedBody = watchedBody?.trim() ?? "";
      if (!trimmedBody) return false;
      try {
        JSON.parse(trimmedBody);
        return true;
      } catch {
        return false;
      }
    })();

    switch (step) {
      case 1:
        return (
          Boolean(watchedName?.trim()) &&
          hasValidUrl &&
          (watchedResponseType === "array" || watchedResponseType === "object") &&
          hasValidPostBody
        );
      case 2:
        if (watchedAuthType === "apiKey") {
          return Boolean(
            watchedAuthConfig?.keyName?.trim() &&
              watchedAuthConfig?.keyValue?.trim()
          );
        }
        if (watchedAuthType === "bearer") {
          return Boolean(watchedAuthConfig?.token?.trim());
        }
        if (watchedAuthType === "basic") {
          return Boolean(
            watchedAuthConfig?.username?.trim() &&
              watchedAuthConfig?.password?.trim()
          );
        }
        return true;
      default:
        return true;
    }
  }, [
    step,
    watchedAuthConfig,
    watchedAuthType,
    watchedBody,
    watchedMethod,
    watchedName,
    watchedResponseType,
    watchedUrl,
  ]);

  const responsePreview = useMemo(
    () => extractDataAtPath(testResult?.data, responseDataPath),
    [testResult, responseDataPath]
  );

  const runTestConnection = async () => {
    const valid = await form.trigger([
      "config.url",
      "config.method",
      "config.authType",
      "config.authConfig",
      "config.headers",
      "config.queryParams",
      "config.body",
    ]);
    if (!valid || isTesting) return;

    const values = form.getValues();
    setIsTesting(true);
    try {
      const result = await testConnection({
        config: {
          url: values.config.url.trim(),
          method: values.config.method,
          responseType: values.config.responseType,
          headers: toRecord(values.config.headers ?? []),
          authType: values.config.authType,
          authConfig: values.config.authConfig,
          queryParams: toRecord(values.config.queryParams ?? []),
          body: values.config.body?.trim() || undefined,
          responseDataPath: values.config.responseDataPath?.trim() || undefined,
        },
      });
      setTestResult(result);
    } finally {
      setIsTesting(false);
    }
  };

  const goNext = async () => {
    if (step === 1) {
      const valid = await form.trigger([
        "name",
        "config.url",
        "config.method",
        "config.responseType",
        "config.body",
      ]);
      if (!valid) return;
    }

    setStep((current) => Math.min(4, current + 1));
  };

  const goBack = () => setStep((current) => Math.max(1, current - 1));

  const onSubmit = async (values: DataSourceFormValues) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const config = {
      url: values.config.url.trim(),
      method: values.config.method,
      responseType: values.config.responseType,
      headers: toRecord(values.config.headers),
      authType: values.config.authType,
      authConfig: values.config.authConfig,
      queryParams: toRecord(values.config.queryParams),
      body:
        values.config.method === "POST"
          ? values.config.body?.trim() || undefined
          : undefined,
      responseDataPath: values.config.responseDataPath?.trim() || undefined,
    };

    try {
      await createDataSource({
        projectId: projectId as Id<"projects">,
        name: values.name.trim(),
        config,
      });

      onSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1
          className="text-2xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-display), sans-serif" }}
        >
          Add Data Source
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Step {step} of 4: {DATA_SOURCE_STEP_TITLES[step]}
        </p>
      </div>

      <div className="rounded-xl border border-amber-400/15 bg-white/3 p-5 sm:p-6">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-6">
            {step === 1 && (
              <>
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="datasource-name">
                        Name <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        id="datasource-name"
                        placeholder="e.g. Public Stats API"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="config.url"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="datasource-url">
                        URL <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        id="datasource-url"
                        placeholder="https://api.example.com/data"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="config.method"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Method</FieldLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {HTTP_METHOD_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="config.responseType"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Response type</FieldLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {RESPONSE_TYPE_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {form.watch("config.method") === "POST" && (
                  <Controller
                    name="config.body"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="datasource-body">Request body</FieldLabel>
                        <Textarea
                          {...field}
                          id="datasource-body"
                          rows={4}
                          placeholder='{"limit": 10}'
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                )}
              </>
            )}

            {step === 2 && (
              <>
                <Controller
                  name="config.authType"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Authentication</FieldLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {AUTH_TYPE_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {form.watch("config.authType") === "apiKey" && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Controller
                      name="config.authConfig.keyName"
                      control={form.control}
                      render={({ field }) => (
                        <Field>
                          <FieldLabel>Key name</FieldLabel>
                          <Input
                            {...field}
                            value={field.value ?? ""}
                            placeholder="x-api-key"
                          />
                        </Field>
                      )}
                    />
                    <Controller
                      name="config.authConfig.keyValue"
                      control={form.control}
                      render={({ field }) => (
                        <Field>
                          <FieldLabel>Key value</FieldLabel>
                          <Input
                            {...field}
                            value={field.value ?? ""}
                            placeholder="••••••••"
                          />
                        </Field>
                      )}
                    />
                    <Controller
                      name="config.authConfig.location"
                      control={form.control}
                      render={({ field }) => (
                        <Field>
                          <FieldLabel>Location</FieldLabel>
                          <Select
                            value={field.value ?? "header"}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="header">Header</SelectItem>
                              <SelectItem value="query">Query Param</SelectItem>
                            </SelectContent>
                          </Select>
                        </Field>
                      )}
                    />
                  </div>
                )}

                {form.watch("config.authType") === "bearer" && (
                  <Controller
                    name="config.authConfig.token"
                    control={form.control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel>Bearer token</FieldLabel>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          placeholder="eyJ..."
                        />
                      </Field>
                    )}
                  />
                )}

                {form.watch("config.authType") === "basic" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Controller
                      name="config.authConfig.username"
                      control={form.control}
                      render={({ field }) => (
                        <Field>
                          <FieldLabel>Username</FieldLabel>
                          <Input
                            {...field}
                            value={field.value ?? ""}
                          />
                        </Field>
                      )}
                    />
                    <Controller
                      name="config.authConfig.password"
                      control={form.control}
                      render={({ field }) => (
                        <Field>
                          <FieldLabel>Password</FieldLabel>
                          <Input
                            {...field}
                            type="password"
                            value={field.value ?? ""}
                          />
                        </Field>
                      )}
                    />
                  </div>
                )}

                <Controller
                  name="config.headers"
                  control={form.control}
                  render={({ field }) => (
                    <KeyValueEditor
                      label="Headers"
                      value={field.value ?? []}
                      onChange={field.onChange}
                      addLabel="Add header"
                    />
                  )}
                />

                <Controller
                  name="config.queryParams"
                  control={form.control}
                  render={({ field }) => (
                    <KeyValueEditor
                      label="Query Parameters"
                      value={field.value ?? []}
                      onChange={field.onChange}
                      addLabel="Add query param"
                    />
                  )}
                />
              </>
            )}

            {step === 3 && (
              <>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={runTestConnection}
                    disabled={isTesting}
                  >
                    {isTesting ? "Testing..." : "Test Connection"}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Run a live request before saving this source.
                  </p>
                </div>

                <Controller
                  name="config.responseDataPath"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="response-path">Response data path</FieldLabel>
                      <Input
                        {...field}
                        id="response-path"
                        placeholder="data.results (leave empty for root)"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <ConnectionTestResult
                  result={testResult}
                  responseDataPath={responseDataPath}
                  extractedData={responsePreview}
                />
              </>
            )}

            {step === 4 && (
              <div className="space-y-3 rounded-lg border border-amber-400/15 bg-white/3 p-4 text-sm">
                <p>
                  <span className="text-muted-foreground">Name:</span>{" "}
                  {form.getValues("name") || "-"}
                </p>
                <p>
                  <span className="text-muted-foreground">URL:</span>{" "}
                  {form.getValues("config.url") || "-"}
                </p>
                <p>
                  <span className="text-muted-foreground">Method:</span>{" "}
                  {form.getValues("config.method")}
                </p>
                <p>
                  <span className="text-muted-foreground">Response type:</span>{" "}
                  {form.getValues("config.responseType")}
                </p>
                <p>
                  <span className="text-muted-foreground">Auth type:</span>{" "}
                  {form.getValues("config.authType")}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              {step !== 1 ? (
                <Button type="button" variant="ghost" onClick={goBack}>
                  Back
                </Button>
              ) : (
                <div />
              )}
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                {step < 4 ? (
                  <Button
                    type="button"
                    onClick={(clickEvent) => {
                      clickEvent.preventDefault();
                      clickEvent.stopPropagation();
                      void goNext();
                    }}
                    disabled={!isCurrentStepValid}
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Data Source"}
                  </Button>
                )}
              </div>
            </div>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
