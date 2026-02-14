"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CircleAlert } from "lucide-react";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-5">
      <h2
        className="text-xl font-semibold tracking-tight text-amber-400"
        style={{ fontFamily: "var(--font-display), sans-serif" }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function Showcase3() {
  return (
    <div
      className="min-h-screen bg-[#0d0d0d] text-white overflow-hidden"
      style={{ fontFamily: "var(--font-mono), monospace" }}
    >
      <div className="fixed inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-size-[48px_48px]" />

      <header className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/10">
        <Link href="/showcase" className="text-lg tracking-[0.3em] uppercase opacity-50 hover:opacity-100 transition-opacity duration-300">
          AnyBoard
        </Link>
        <div className="flex items-center gap-8 text-sm">
          <Link href="/showcase/2" className="text-white/40 hover:text-white transition-colors duration-300">
            &larr; Prev
          </Link>
          <span className="text-white/25">03 / 05</span>
          <Link href="/showcase/4" className="text-white/40 hover:text-white transition-colors duration-300">
            Next &rarr;
          </Link>
        </div>
      </header>

      <main className="relative z-10 max-w-3xl mx-auto px-8 pt-14 pb-24 space-y-12">
        <div>
          <span className="text-xs tracking-[0.2em] uppercase text-amber-400/60 block mb-2">
            Variation 03
          </span>
          <h1
            className="text-4xl font-semibold tracking-tighter mb-2"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            SOFT &amp; ROUNDED
          </h1>
          <p className="text-sm text-white/50">
            Rounded corners, gentle shadows, amber glow. Friendly but still dark.
          </p>
        </div>

        {/* ── Buttons ── */}
        <Section title="Buttons">
          <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link" className="px-0">Link</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </Section>

        {/* ── Toggle & Dropdown ── */}
        <Section title="Toggle & Dropdown">
          <div className="flex gap-3">
            <Toggle aria-label="Toggle" className="text-sm h-10 px-4 min-w-10 rounded-lg transition-all duration-300">Aa</Toggle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-sm px-5 h-10 rounded-lg shadow-sm transition-all duration-300">Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-xl shadow-lg shadow-black/30 border-white/10 min-w-[160px]">
                <DropdownMenuLabel className="text-xs text-white/40">Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-sm rounded-md">View</DropdownMenuItem>
                <DropdownMenuItem className="text-sm rounded-md">Edit</DropdownMenuItem>
                <DropdownMenuItem className="text-sm rounded-md">Export</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Section>

        {/* ── Form Controls — Warm Amber variations ── */}
        <Section title="Form Controls">
          <Tabs defaultValue="v1">
            <TabsList className="rounded-lg h-9 mb-6">
              <TabsTrigger value="v1" className="text-xs rounded-md px-3 h-7 transition-all duration-300">Subtle</TabsTrigger>
              <TabsTrigger value="v2" className="text-xs rounded-md px-3 h-7 transition-all duration-300">Bold Border</TabsTrigger>
              <TabsTrigger value="v3" className="text-xs rounded-md px-3 h-7 transition-all duration-300">Filled</TabsTrigger>
              <TabsTrigger value="v4" className="text-xs rounded-md px-3 h-7 transition-all duration-300">Left Accent</TabsTrigger>
              <TabsTrigger value="v5" className="text-xs rounded-md px-3 h-7 transition-all duration-300">Underline</TabsTrigger>
            </TabsList>

            {/* ── V1: Subtle — soft amber tint, ring only on focus ── */}
            <TabsContent value="v1">
              <div className="space-y-5 max-w-sm">
                <div>
                  <label className="block text-xs text-amber-400/60 mb-1.5 font-medium">Input</label>
                  <Input placeholder="Enter text..." className="text-sm h-10 px-4 rounded-md shadow-sm border-amber-400/15 bg-amber-400/[0.03] transition-all duration-300 focus-visible:border-transparent focus-visible:ring-[2px] focus-visible:ring-amber-400/70 focus-visible:ring-offset-0 focus:bg-amber-400/[0.05]" />
                </div>
                <div>
                  <label className="block text-xs text-amber-400/60 mb-1.5 font-medium">Textarea</label>
                  <Textarea placeholder="Type message..." rows={3} className="text-sm px-4 py-2.5 rounded-md shadow-sm border-amber-400/15 bg-amber-400/[0.03] transition-all duration-300 focus-visible:border-transparent focus-visible:ring-[2px] focus-visible:ring-amber-400/70 focus-visible:ring-offset-0 focus:bg-amber-400/[0.05]" />
                </div>
                <div className="flex items-center gap-3">
                  <Switch defaultChecked />
                  <span className="text-sm text-white/70">Toggle switch</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Checkbox id="v1c" className="rounded-[4px] border-amber-400/25 data-[state=checked]:bg-amber-400 data-[state=checked]:border-amber-400 focus-visible:border-transparent focus-visible:ring-[2px] focus-visible:ring-amber-400/70 focus-visible:ring-offset-0" />
                  <label htmlFor="v1c" className="text-sm text-white/70">Accept terms</label>
                </div>
                <div>
                  <label className="block text-xs text-amber-400/60 mb-1.5 font-medium">Radio</label>
                  <RadioGroup defaultValue="a" className="gap-2.5">
                    <div className="flex items-center gap-2.5">
                      <RadioGroupItem value="a" id="v1ra" className="border-amber-400/25 text-amber-400 focus-visible:border-transparent focus-visible:ring-[2px] focus-visible:ring-amber-400/70 focus-visible:ring-offset-0" />
                      <label htmlFor="v1ra" className="text-sm">Option A</label>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <RadioGroupItem value="b" id="v1rb" className="border-amber-400/25 text-amber-400 focus-visible:border-transparent focus-visible:ring-[2px] focus-visible:ring-amber-400/70 focus-visible:ring-offset-0" />
                      <label htmlFor="v1rb" className="text-sm">Option B</label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <label className="block text-xs text-amber-400/60 mb-1.5 font-medium">Select</label>
                  <Select>
                    <SelectTrigger className="text-sm h-10 px-4 rounded-md shadow-sm border-amber-400/15 bg-amber-400/[0.03] focus-visible:border-transparent focus-visible:ring-[2px] focus-visible:ring-amber-400/70 focus-visible:ring-offset-0">
                      <SelectValue placeholder="Pick one" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg shadow-lg shadow-black/30 border-amber-400/10">
                      <SelectItem value="a" className="text-sm rounded-md">Option A</SelectItem>
                      <SelectItem value="b" className="text-sm rounded-md">Option B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-xs text-amber-400/60 mb-1.5 font-medium">Slider</label>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
              </div>
            </TabsContent>

            {/* ── V2: Bold Border — thicker amber border, ring only on focus ── */}
            <TabsContent value="v2">
              <div className="space-y-5 max-w-sm">
                <div>
                  <label className="block text-xs text-amber-400/70 mb-1.5 font-medium">Input</label>
                  <Input placeholder="Enter text..." className="text-sm h-10 px-4 rounded-md border-2 border-amber-400/20 bg-transparent shadow-none transition-all duration-200 focus-visible:border-transparent focus-visible:ring-[2px] focus-visible:ring-amber-400/70 focus-visible:ring-offset-0" />
                </div>
                <div>
                  <label className="block text-xs text-amber-400/70 mb-1.5 font-medium">Textarea</label>
                  <Textarea placeholder="Type message..." rows={3} className="text-sm px-4 py-2.5 rounded-md border-2 border-amber-400/20 bg-transparent shadow-none transition-all duration-200 focus-visible:border-transparent focus-visible:ring-[2px] focus-visible:ring-amber-400/70 focus-visible:ring-offset-0" />
                </div>
                <div className="flex items-center gap-3">
                  <Switch defaultChecked />
                  <span className="text-sm text-white/70">Toggle switch</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Checkbox id="v2c" className="rounded-[4px] border-2 border-amber-400/25 data-[state=checked]:bg-amber-400 data-[state=checked]:border-amber-400 focus-visible:border-transparent focus-visible:ring-[2px] focus-visible:ring-amber-400/70 focus-visible:ring-offset-0" />
                  <label htmlFor="v2c" className="text-sm text-white/70">Accept terms</label>
                </div>
                <div>
                  <label className="block text-xs text-amber-400/70 mb-1.5 font-medium">Radio</label>
                  <RadioGroup defaultValue="a" className="gap-2.5">
                    <div className="flex items-center gap-2.5">
                      <RadioGroupItem value="a" id="v2ra" className="border-2 border-amber-400/25 text-amber-400 focus-visible:border-transparent focus-visible:ring-[2px] focus-visible:ring-amber-400/70 focus-visible:ring-offset-0" />
                      <label htmlFor="v2ra" className="text-sm">Option A</label>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <RadioGroupItem value="b" id="v2rb" className="border-2 border-amber-400/25 text-amber-400 focus-visible:border-transparent focus-visible:ring-[2px] focus-visible:ring-amber-400/70 focus-visible:ring-offset-0" />
                      <label htmlFor="v2rb" className="text-sm">Option B</label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <label className="block text-xs text-amber-400/70 mb-1.5 font-medium">Select</label>
                  <Select>
                    <SelectTrigger className="text-sm h-10 px-4 rounded-md border-2 border-amber-400/20 bg-transparent shadow-none focus-visible:border-transparent focus-visible:ring-[2px] focus-visible:ring-amber-400/70 focus-visible:ring-offset-0">
                      <SelectValue placeholder="Pick one" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg shadow-lg shadow-black/30 border-amber-400/15">
                      <SelectItem value="a" className="text-sm rounded-md">Option A</SelectItem>
                      <SelectItem value="b" className="text-sm rounded-md">Option B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-xs text-amber-400/70 mb-1.5 font-medium">Slider</label>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
              </div>
            </TabsContent>

            {/* ── V3: Filled — amber bg fill, bg intensifies on focus ── */}
            <TabsContent value="v3">
              <div className="space-y-5 max-w-sm">
                <div>
                  <label className="block text-xs text-amber-400 mb-1.5 font-medium">Input</label>
                  <Input placeholder="Enter text..." className="text-sm h-10 px-4 rounded-md border-amber-400/20 bg-amber-400/[0.06] text-white placeholder:text-amber-400/30 shadow-none transition-all duration-300 focus-visible:ring-0 focus-visible:border-amber-400/40 focus:bg-amber-400/[0.12] focus:shadow-[0_0_16px_rgba(251,191,36,0.08)]" />
                </div>
                <div>
                  <label className="block text-xs text-amber-400 mb-1.5 font-medium">Textarea</label>
                  <Textarea placeholder="Type message..." rows={3} className="text-sm px-4 py-2.5 rounded-md border-amber-400/20 bg-amber-400/[0.06] text-white placeholder:text-amber-400/30 shadow-none transition-all duration-300 focus-visible:ring-0 focus-visible:border-amber-400/40 focus:bg-amber-400/[0.12] focus:shadow-[0_0_16px_rgba(251,191,36,0.08)]" />
                </div>
                <div className="flex items-center gap-3">
                  <Switch defaultChecked />
                  <span className="text-sm text-amber-400/80">Toggle switch</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Checkbox id="v3c" className="rounded-[4px] border-amber-400/30 bg-amber-400/[0.06] data-[state=checked]:bg-amber-400 data-[state=checked]:border-amber-400 focus-visible:ring-0" />
                  <label htmlFor="v3c" className="text-sm text-amber-400/80">Accept terms</label>
                </div>
                <div>
                  <label className="block text-xs text-amber-400 mb-1.5 font-medium">Radio</label>
                  <RadioGroup defaultValue="a" className="gap-2.5">
                    <div className="flex items-center gap-2.5">
                      <RadioGroupItem value="a" id="v3ra" className="border-amber-400/30 bg-amber-400/[0.06] text-amber-400 focus-visible:ring-0" />
                      <label htmlFor="v3ra" className="text-sm text-amber-400/80">Option A</label>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <RadioGroupItem value="b" id="v3rb" className="border-amber-400/30 bg-amber-400/[0.06] text-amber-400 focus-visible:ring-0" />
                      <label htmlFor="v3rb" className="text-sm text-amber-400/80">Option B</label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <label className="block text-xs text-amber-400 mb-1.5 font-medium">Select</label>
                  <Select>
                    <SelectTrigger className="text-sm h-10 px-4 rounded-md border-amber-400/20 bg-amber-400/[0.06] shadow-none focus-visible:ring-0 focus-visible:border-amber-400/40">
                      <SelectValue placeholder="Pick one" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg shadow-lg shadow-black/30 border-amber-400/15 bg-[#1a1508]">
                      <SelectItem value="a" className="text-sm rounded-md focus:bg-amber-400/10 focus:text-amber-400">Option A</SelectItem>
                      <SelectItem value="b" className="text-sm rounded-md focus:bg-amber-400/10 focus:text-amber-400">Option B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-xs text-amber-400 mb-1.5 font-medium">Slider</label>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
              </div>
            </TabsContent>

            {/* ── V4: Left Accent — 3px amber left border only, border lights up on focus ── */}
            <TabsContent value="v4">
              <div className="space-y-5 max-w-sm">
                <div>
                  <label className="block text-xs text-amber-400/60 mb-1.5 font-medium">Input</label>
                  <Input placeholder="Enter text..." className="text-sm h-10 px-4 rounded-none border-0 border-l-[3px] border-amber-400/25 bg-white/[0.03] shadow-none transition-all duration-300 focus-visible:ring-0 focus-visible:outline-none focus:border-amber-400/70 focus:bg-white/[0.05]" />
                </div>
                <div>
                  <label className="block text-xs text-amber-400/60 mb-1.5 font-medium">Textarea</label>
                  <Textarea placeholder="Type message..." rows={3} className="text-sm px-4 py-2.5 rounded-none border-0 border-l-[3px] border-amber-400/25 bg-white/[0.03] shadow-none transition-all duration-300 focus-visible:ring-0 focus-visible:outline-none focus:border-amber-400/70 focus:bg-white/[0.05]" />
                </div>
                <div className="flex items-center gap-3 pl-3 border-l-[3px] border-amber-400/15">
                  <Switch defaultChecked />
                  <span className="text-sm text-white/70">Toggle switch</span>
                </div>
                <div className="flex items-center gap-2.5 pl-3 border-l-[3px] border-amber-400/15">
                  <Checkbox id="v4c" className="rounded-[4px] border-amber-400/25 data-[state=checked]:bg-amber-400 data-[state=checked]:border-amber-400 focus-visible:ring-0 focus-visible:outline-none" />
                  <label htmlFor="v4c" className="text-sm text-white/70">Accept terms</label>
                </div>
                <div className="pl-3 border-l-[3px] border-amber-400/15">
                  <label className="block text-xs text-amber-400/60 mb-1.5 font-medium">Radio</label>
                  <RadioGroup defaultValue="a" className="gap-2.5">
                    <div className="flex items-center gap-2.5">
                      <RadioGroupItem value="a" id="v4ra" className="border-amber-400/25 text-amber-400 focus-visible:ring-0 focus-visible:outline-none" />
                      <label htmlFor="v4ra" className="text-sm">Option A</label>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <RadioGroupItem value="b" id="v4rb" className="border-amber-400/25 text-amber-400 focus-visible:ring-0 focus-visible:outline-none" />
                      <label htmlFor="v4rb" className="text-sm">Option B</label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <label className="block text-xs text-amber-400/60 mb-1.5 font-medium">Select</label>
                  <Select>
                    <SelectTrigger className="text-sm h-10 px-4 rounded-none border-0 border-l-[3px] border-amber-400/25 bg-white/[0.03] shadow-none focus-visible:ring-0 focus-visible:outline-none focus:border-amber-400/70">
                      <SelectValue placeholder="Pick one" />
                    </SelectTrigger>
                    <SelectContent className="rounded-md shadow-lg shadow-black/30 border-amber-400/10">
                      <SelectItem value="a" className="text-sm rounded-sm">Option A</SelectItem>
                      <SelectItem value="b" className="text-sm rounded-sm">Option B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-xs text-amber-400/60 mb-1.5 font-medium">Slider</label>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
              </div>
            </TabsContent>

            {/* ── V5: Underline — bottom-border-only, amber line lights up on focus ── */}
            <TabsContent value="v5">
              <div className="space-y-5 max-w-sm">
                <div>
                  <label className="block text-xs text-amber-400/60 mb-1.5 font-medium">Input</label>
                  <Input placeholder="Enter text..." className="text-sm h-10 px-1 rounded-none border-0 border-b-2 border-amber-400/20 bg-transparent shadow-none transition-all duration-300 focus-visible:ring-0 focus-visible:outline-none focus:border-amber-400/60 placeholder:text-white/25" />
                </div>
                <div>
                  <label className="block text-xs text-amber-400/60 mb-1.5 font-medium">Textarea</label>
                  <Textarea placeholder="Type message..." rows={3} className="text-sm px-1 py-2 rounded-none border-0 border-b-2 border-amber-400/20 bg-transparent shadow-none transition-all duration-300 focus-visible:ring-0 focus-visible:outline-none focus:border-amber-400/60 placeholder:text-white/25 min-h-0" />
                </div>
                <div className="flex items-center gap-3 pb-2 border-b border-amber-400/10">
                  <Switch defaultChecked />
                  <span className="text-sm text-white/70">Toggle switch</span>
                </div>
                <div className="flex items-center gap-2.5 pb-2 border-b border-amber-400/10">
                  <Checkbox id="v5c" className="rounded-[4px] border-amber-400/25 data-[state=checked]:bg-amber-400 data-[state=checked]:border-amber-400 focus-visible:ring-0 focus-visible:outline-none" />
                  <label htmlFor="v5c" className="text-sm text-white/70">Accept terms</label>
                </div>
                <div className="pb-2 border-b border-amber-400/10">
                  <label className="block text-xs text-amber-400/60 mb-1.5 font-medium">Radio</label>
                  <RadioGroup defaultValue="a" className="gap-2.5">
                    <div className="flex items-center gap-2.5">
                      <RadioGroupItem value="a" id="v5ra" className="border-amber-400/25 text-amber-400 focus-visible:ring-0 focus-visible:outline-none" />
                      <label htmlFor="v5ra" className="text-sm">Option A</label>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <RadioGroupItem value="b" id="v5rb" className="border-amber-400/25 text-amber-400 focus-visible:ring-0 focus-visible:outline-none" />
                      <label htmlFor="v5rb" className="text-sm">Option B</label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <label className="block text-xs text-amber-400/60 mb-1.5 font-medium">Select</label>
                  <Select>
                    <SelectTrigger className="text-sm h-10 px-1 rounded-none border-0 border-b-2 border-amber-400/20 bg-transparent shadow-none focus-visible:ring-0 focus-visible:outline-none focus:border-amber-400/60">
                      <SelectValue placeholder="Pick one" />
                    </SelectTrigger>
                    <SelectContent className="rounded-md shadow-lg shadow-black/30 border-amber-400/10">
                      <SelectItem value="a" className="text-sm rounded-sm">Option A</SelectItem>
                      <SelectItem value="b" className="text-sm rounded-sm">Option B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-xs text-amber-400/60 mb-1.5 font-medium">Slider</label>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Section>

        {/* ── Card ── */}
        <Section title="Card">
          <Card className="rounded-xl border-white/10 shadow-lg shadow-black/30 py-6 gap-4">
            <CardHeader className="px-6 gap-1.5">
              <CardTitle className="text-base font-semibold">Card Title</CardTitle>
              <CardDescription className="text-sm text-white/40">Card description text</CardDescription>
            </CardHeader>
            <CardContent className="px-6">
              <p className="text-sm text-white/60">Card content goes here.</p>
            </CardContent>
            <CardFooter className="px-6">
              <Button className="text-sm px-4 py-2 h-auto rounded-lg shadow-sm transition-all duration-300">Action</Button>
            </CardFooter>
          </Card>
        </Section>

        {/* ── Badges ── */}
        <Section title="Badges">
          <div className="flex flex-wrap gap-2.5">
            <Badge className="text-xs px-2.5 py-0.5 rounded-full shadow-sm">Default</Badge>
            <Badge variant="secondary" className="text-xs px-2.5 py-0.5 rounded-full shadow-sm">Secondary</Badge>
            <Badge variant="outline" className="text-xs px-2.5 py-0.5 rounded-full shadow-sm">Outline</Badge>
            <Badge variant="destructive" className="text-xs px-2.5 py-0.5 rounded-full shadow-sm">Destructive</Badge>
          </div>
        </Section>

        {/* ── Avatar ── */}
        <Section title="Avatar">
          <div className="flex gap-3">
            <Avatar className="size-9 shadow-md shadow-black/20">
              <AvatarFallback className="text-sm">AB</AvatarFallback>
            </Avatar>
            <Avatar className="size-9 shadow-md shadow-black/20">
              <AvatarFallback className="text-sm">CD</AvatarFallback>
            </Avatar>
          </div>
        </Section>

        {/* ── Progress ── */}
        <Section title="Progress">
          <div className="space-y-2.5 max-w-sm">
            <Progress value={65} className="h-2 rounded-full" />
            <Progress value={33} className="h-2 rounded-full" />
          </div>
        </Section>

        {/* ── Table ── */}
        <Section title="Table">
          <div className="border border-white/10 rounded-xl overflow-hidden shadow-lg shadow-black/20">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-xs text-white/40 h-10 px-5">Name</TableHead>
                  <TableHead className="text-xs text-white/40 h-10 px-5">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-white/10 transition-colors duration-300 hover:bg-white/[0.03]">
                  <TableCell className="text-sm px-5 py-3">Dashboard A</TableCell>
                  <TableCell className="px-5 py-3"><Badge variant="secondary" className="text-xs px-2.5 py-0.5 rounded-full shadow-sm">Active</Badge></TableCell>
                </TableRow>
                <TableRow className="border-white/10 transition-colors duration-300 hover:bg-white/[0.03]">
                  <TableCell className="text-sm px-5 py-3">Dashboard B</TableCell>
                  <TableCell className="px-5 py-3"><Badge className="text-xs px-2.5 py-0.5 rounded-full shadow-sm">Pending</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Section>

        {/* ── Alert ── */}
        <Section title="Alert">
          <div className="space-y-3 max-w-md">
            <Alert className="rounded-xl border-white/10 shadow-md shadow-black/20 py-3 px-4">
              <CircleAlert className="size-4" />
              <AlertTitle className="text-sm font-semibold">Info</AlertTitle>
              <AlertDescription className="text-xs text-white/50">Informational alert message.</AlertDescription>
            </Alert>
            <Alert variant="destructive" className="rounded-xl shadow-md shadow-black/20 py-3 px-4">
              <CircleAlert className="size-4" />
              <AlertTitle className="text-sm font-semibold">Error</AlertTitle>
              <AlertDescription className="text-xs">Something went wrong.</AlertDescription>
            </Alert>
          </div>
        </Section>

        {/* ── Dialog & Tooltip ── */}
        <Section title="Dialog & Tooltip">
          <div className="flex gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="text-sm px-5 h-10 rounded-lg shadow-sm transition-all duration-300">Open Dialog</Button>
              </DialogTrigger>
              <DialogContent className="rounded-2xl shadow-2xl shadow-black/40">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold">Dialog Title</DialogTitle>
                  <DialogDescription className="text-sm text-white/50">Modal dialog content.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button className="text-sm px-5 py-2.5 h-auto rounded-lg">Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="text-sm px-5 h-10 rounded-lg shadow-sm transition-all duration-300">Tooltip</Button>
              </TooltipTrigger>
              <TooltipContent className="rounded-lg shadow-lg shadow-black/30 text-sm px-3 py-1.5">
                <p>Tooltip message</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </Section>

        {/* ── Tabs ── */}
        <Section title="Tabs">
          <Tabs defaultValue="t1">
            <TabsList className="rounded-lg h-10">
              <TabsTrigger value="t1" className="text-sm rounded-md px-4 h-8 transition-all duration-300">Tab 1</TabsTrigger>
              <TabsTrigger value="t2" className="text-sm rounded-md px-4 h-8 transition-all duration-300">Tab 2</TabsTrigger>
              <TabsTrigger value="t3" className="text-sm rounded-md px-4 h-8 transition-all duration-300">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="t1" className="pt-3 text-sm text-white/60">Content for tab 1.</TabsContent>
            <TabsContent value="t2" className="pt-3 text-sm text-white/60">Content for tab 2.</TabsContent>
            <TabsContent value="t3" className="pt-3 text-sm text-white/60">Content for tab 3.</TabsContent>
          </Tabs>
        </Section>

        {/* ── Separator ── */}
        <Section title="Separator">
          <div className="space-y-3 text-sm text-white/50">
            <p>Content above</p>
            <Separator className="bg-white/10 rounded-full" />
            <p>Content below</p>
          </div>
        </Section>

        {/* ── Nav ── */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10 text-sm">
          <Link href="/showcase/2" className="text-white/40 hover:text-white transition-colors duration-300">&larr; Bold &amp; Oversized</Link>
          <Link href="/showcase/4" className="text-white/40 hover:text-white transition-colors duration-300">Outlined &amp; Glowing &rarr;</Link>
        </div>
      </main>
    </div>
  );
}
