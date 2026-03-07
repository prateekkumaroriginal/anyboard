"use client";

import { useEffect, useMemo, useState } from "react";
import type { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
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

interface DataSourceEditFormProps {
  onCancel: () => void;
  onSuccess: () => void;
  dataSource: Doc<"dataSources">;
}

type DataSourceFormInputValues = z.input<typeof dataSourceSchema>;

function toKeyValuePairs(input: unknown): KeyValuePair[] {
  if (!input || typeof input !== "object" || Array.isArray(input)) return [];
  return Object.entries(input as Record<string, unknown>).map(([key, value]) => ({
    key,
    value: typeof value === "string" ? value : JSON.stringify(value),
  }));
}

function defaultValues(
  dataSource: Doc<"dataSources">
): DataSourceFormValues {
  const authConfig =
    dataSource.config.authConfig && typeof dataSource.config.authConfig === "object"
      ? (dataSource.config.authConfig as Record<string, unknown>)
      : {};

  return {
    name: dataSource.name,
    config: {
      url: dataSource.config.url,
      method: dataSource.config.method,
      responseType: dataSource.config.responseType,
      headers: toKeyValuePairs(dataSource.config.headers),
      authType: dataSource.config.authType ?? "none",
      authConfig: {
        keyName:
          typeof authConfig.keyName === "string" ? authConfig.keyName : "",
        keyValue:
          typeof authConfig.keyValue === "string" ? authConfig.keyValue : "",
        location: authConfig.location === "query" ? "query" : "header",
        token: typeof authConfig.token === "string" ? authConfig.token : "",
        username:
          typeof authConfig.username === "string" ? authConfig.username : "",
        password:
          typeof authConfig.password === "string" ? authConfig.password : "",
      },
      queryParams: toKeyValuePairs(dataSource.config.queryParams),
      body: dataSource.config.body ?? "",
      responseDataPath: dataSource.config.responseDataPath ?? "",
    },
  };
}

function toRecord(pairs: KeyValuePair[]): Record<string, string> | undefined {
  const value = pairs.reduce<Record<string, string>>((acc, pair) => {
    const key = pair.key.trim();
    if (!key) return acc;
    acc[key] = pair.value;
    return acc;
  }, {});
  return Object.keys(value).length > 0 ? value : undefined;
}

export function DataSourceEditForm({
  onCancel,
  onSuccess,
  dataSource,
}: DataSourceEditFormProps) {
  const updateDataSource = useMutation(api.dataSources.update);
  const testConnection = useAction(api.dataSources.testConnection);

  const [isTesting, setIsTesting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResult, setTestResult] = useState<ConnectionTestState | null>(null);

  const form = useForm<
    DataSourceFormInputValues,
    unknown,
    DataSourceFormValues
  >({
    resolver: zodResolver(dataSourceSchema),
    defaultValues: defaultValues(dataSource),
    mode: "onTouched",
  });

  useEffect(() => {
    form.reset(defaultValues(dataSource));
    setTestResult(null);
  }, [dataSource, form]);

  const responseDataPath = form.watch("config.responseDataPath");
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
      await updateDataSource({
        id: dataSource._id,
        name: values.name.trim(),
        config,
      });

      onSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="mb-6">
        <h1
          className="text-2xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-display), sans-serif" }}
        >
          Edit Data Source
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Edit data source configuration
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-5 sm:p-6 shadow-sm">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-8">
            {/* --- SECTION: Basic Configuration --- */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold tracking-tight border-b pb-2">{DATA_SOURCE_STEP_TITLES[1]}</h2>

              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="datasource-name">
                      Name <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input {...field} id="datasource-name" placeholder="e.g. Public Stats API" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                    <Input {...field} id="datasource-url" placeholder="https://api.example.com/data" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>

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
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              )}
            </section>

            {/* --- SECTION: Authentication & Headers --- */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold tracking-tight border-b pb-2">{DATA_SOURCE_STEP_TITLES[2]}</h2>

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
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                        <Input {...field} value={field.value ?? ""} placeholder="x-api-key" />
                      </Field>
                    )}
                  />
                  <Controller
                    name="config.authConfig.keyValue"
                    control={form.control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel>Key value</FieldLabel>
                        <Input {...field} value={field.value ?? ""} placeholder="••••••••" />
                      </Field>
                    )}
                  />
                  <Controller
                    name="config.authConfig.location"
                    control={form.control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel>Location</FieldLabel>
                        <Select value={field.value ?? "header"} onValueChange={field.onChange}>
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
                      <Input {...field} value={field.value ?? ""} placeholder="eyJ..." />
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
                        <Input {...field} value={field.value ?? ""} />
                      </Field>
                    )}
                  />
                  <Controller
                    name="config.authConfig.password"
                    control={form.control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel>Password</FieldLabel>
                        <Input {...field} type="password" value={field.value ?? ""} />
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
            </section>

            {/* --- SECTION: Test Connection --- */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold tracking-tight border-b pb-2">{DATA_SOURCE_STEP_TITLES[3]}</h2>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button type="button" variant="outline" onClick={runTestConnection} disabled={isTesting}>
                  {isTesting ? "Testing..." : "Test Connection"}
                </Button>
                <p className="text-xs text-muted-foreground">
                  Run a live request against this endpoint.
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
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <ConnectionTestResult
                result={testResult}
                responseDataPath={responseDataPath}
                extractedData={responsePreview}
              />
            </section>


            {/* --- Actions --- */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t">
              <Button type="button" variant="ghost" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
