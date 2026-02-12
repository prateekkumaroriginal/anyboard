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
    <section className="space-y-6">
      <h2
        className="text-2xl font-bold tracking-tight text-amber-400"
        style={{ fontFamily: "var(--font-display), sans-serif" }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function Showcase2() {
  return (
    <div
      className="min-h-screen bg-[#0d0d0d] text-white overflow-hidden"
      style={{ fontFamily: "var(--font-mono), monospace" }}
    >
      <div className="fixed inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-size-[48px_48px]" />

      <header className="relative z-10 flex items-center justify-between px-10 py-8 border-b-2 border-white/15">
        <Link href="/showcase" className="text-xl tracking-[0.3em] uppercase font-bold opacity-60 hover:opacity-100 transition-opacity">
          AnyBoard
        </Link>
        <div className="flex items-center gap-8 text-base font-semibold">
          <Link href="/showcase/1" className="text-white/40 hover:text-white transition-colors">
            &larr; Prev
          </Link>
          <span className="text-white/30">02 / 05</span>
          <Link href="/showcase/3" className="text-white/40 hover:text-white transition-colors">
            Next &rarr;
          </Link>
        </div>
      </header>

      <main className="relative z-10 max-w-3xl mx-auto px-10 pt-16 pb-28 space-y-14">
        <div>
          <span className="text-sm tracking-[0.2em] uppercase text-amber-400/70 font-semibold block mb-3">
            Variation 02
          </span>
          <h1
            className="text-5xl md:text-6xl font-bold tracking-tighter mb-3"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            BOLD &amp; OVERSIZED
          </h1>
          <p className="text-lg text-white/50 font-medium">
            Big type, thick borders, generous padding. Impossible to miss.
          </p>
        </div>

        {/* ── Buttons ── */}
        <Section title="BUTTONS">
          <div className="flex flex-wrap gap-5">
            <Button className="text-base font-bold px-8 py-3.5 h-auto rounded-none border-2 hover:scale-[1.02] hover:brightness-110 transition-all">Default</Button>
            <Button variant="secondary" className="text-base font-bold px-8 py-3.5 h-auto rounded-none border-2 border-transparent hover:scale-[1.02] hover:brightness-110 transition-all">Secondary</Button>
            <Button variant="outline" className="text-base font-bold px-8 py-3.5 h-auto rounded-none border-2 border-white/15 hover:scale-[1.02] hover:brightness-110 transition-all">Outline</Button>
            <Button variant="ghost" className="text-base font-bold px-8 py-3.5 h-auto rounded-none hover:scale-[1.02] transition-all">Ghost</Button>
            <Button variant="link" className="text-base font-bold px-0 h-auto">Link</Button>
            <Button variant="destructive" className="text-base font-bold px-8 py-3.5 h-auto rounded-none border-2 border-transparent hover:scale-[1.02] hover:brightness-110 transition-all">Destructive</Button>
          </div>
        </Section>

        {/* ── Toggle & Dropdown ── */}
        <Section title="TOGGLE & DROPDOWN">
          <div className="flex gap-5">
            <Toggle aria-label="Toggle" className="text-base font-bold h-12 px-5 min-w-12 rounded-none border-2 border-transparent">Aa</Toggle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-base font-bold px-8 h-12 rounded-none border-2 border-white/15 hover:scale-[1.02] transition-all">Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-none border-2 border-white/15 min-w-[180px]">
                <DropdownMenuLabel className="text-sm font-bold tracking-wide uppercase">Actions</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/15" />
                <DropdownMenuItem className="text-base font-medium py-2">View</DropdownMenuItem>
                <DropdownMenuItem className="text-base font-medium py-2">Edit</DropdownMenuItem>
                <DropdownMenuItem className="text-base font-medium py-2">Export</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Section>

        {/* ── Form Controls ── */}
        <Section title="FORM CONTROLS">
          <div className="space-y-6 max-w-md">
            <div>
              <label className="block text-sm font-semibold tracking-wide uppercase text-white/50 mb-2">Input</label>
              <Input placeholder="Enter text..." className="text-base h-12 px-4 rounded-none border-2 border-white/15" />
            </div>
            <div>
              <label className="block text-sm font-semibold tracking-wide uppercase text-white/50 mb-2">Textarea</label>
              <Textarea placeholder="Type message..." rows={3} className="text-base px-4 py-3 rounded-none border-2 border-white/15" />
            </div>
            <div className="flex items-center gap-4">
              <Switch defaultChecked className="scale-125 origin-left" />
              <span className="text-base font-medium">Toggle switch</span>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="t2" className="rounded-none size-5 border-2" />
              <label htmlFor="t2" className="text-base font-medium">Accept terms</label>
            </div>
            <div>
              <label className="block text-sm font-semibold tracking-wide uppercase text-white/50 mb-2">Radio</label>
              <RadioGroup defaultValue="a" className="gap-3">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="a" id="r2a" className="size-5 border-2" />
                  <label htmlFor="r2a" className="text-base font-medium">Option A</label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="b" id="r2b" className="size-5 border-2" />
                  <label htmlFor="r2b" className="text-base font-medium">Option B</label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <label className="block text-sm font-semibold tracking-wide uppercase text-white/50 mb-2">Select</label>
              <Select>
                <SelectTrigger className="text-base h-12 px-4 rounded-none border-2 border-white/15">
                  <SelectValue placeholder="Pick one" />
                </SelectTrigger>
                <SelectContent className="rounded-none border-2 border-white/15">
                  <SelectItem value="a" className="text-base py-2">Option A</SelectItem>
                  <SelectItem value="b" className="text-base py-2">Option B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-semibold tracking-wide uppercase text-white/50 mb-2">Slider</label>
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>
          </div>
        </Section>

        {/* ── Card ── */}
        <Section title="CARD">
          <Card className="rounded-none border-2 border-white/15 py-8 gap-5 shadow-none">
            <CardHeader className="px-8 gap-2">
              <CardTitle className="text-lg font-bold tracking-tight">Card Title</CardTitle>
              <CardDescription className="text-base text-white/40">Card description text</CardDescription>
            </CardHeader>
            <CardContent className="px-8">
              <p className="text-base text-white/60">Card content goes here.</p>
            </CardContent>
            <CardFooter className="px-8">
              <Button className="text-base font-bold px-6 py-3 h-auto rounded-none hover:scale-[1.02] transition-transform">Action</Button>
            </CardFooter>
          </Card>
        </Section>

        {/* ── Badges ── */}
        <Section title="BADGES">
          <div className="flex flex-wrap gap-3">
            <Badge className="text-sm px-3 py-1 rounded-none font-bold">Default</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1 rounded-none font-bold">Secondary</Badge>
            <Badge variant="outline" className="text-sm px-3 py-1 rounded-none font-bold border-2 border-white/15">Outline</Badge>
            <Badge variant="destructive" className="text-sm px-3 py-1 rounded-none font-bold">Destructive</Badge>
          </div>
        </Section>

        {/* ── Avatar ── */}
        <Section title="AVATAR">
          <div className="flex gap-4">
            <Avatar className="size-12 rounded-none">
              <AvatarFallback className="rounded-none text-lg font-bold">AB</AvatarFallback>
            </Avatar>
            <Avatar className="size-12 rounded-none">
              <AvatarFallback className="rounded-none text-lg font-bold">CD</AvatarFallback>
            </Avatar>
          </div>
        </Section>

        {/* ── Progress ── */}
        <Section title="PROGRESS">
          <div className="space-y-3 max-w-md">
            <Progress value={65} className="h-3 rounded-none" />
            <Progress value={33} className="h-3 rounded-none" />
          </div>
        </Section>

        {/* ── Table ── */}
        <Section title="TABLE">
          <div className="border-2 border-white/15 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-white/15">
                  <TableHead className="text-sm font-bold tracking-wide uppercase text-white/50 h-12 px-6">Name</TableHead>
                  <TableHead className="text-sm font-bold tracking-wide uppercase text-white/50 h-12 px-6">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-white/15">
                  <TableCell className="text-base font-medium px-6 py-4">Dashboard A</TableCell>
                  <TableCell className="px-6 py-4"><Badge variant="secondary" className="text-sm px-3 py-1 rounded-none font-bold">Active</Badge></TableCell>
                </TableRow>
                <TableRow className="border-white/15">
                  <TableCell className="text-base font-medium px-6 py-4">Dashboard B</TableCell>
                  <TableCell className="px-6 py-4"><Badge className="text-sm px-3 py-1 rounded-none font-bold">Pending</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Section>

        {/* ── Alert ── */}
        <Section title="ALERT">
          <div className="space-y-4 max-w-lg">
            <Alert className="rounded-none border-2 border-white/15 py-4 px-5">
              <CircleAlert className="size-5" />
              <AlertTitle className="text-base font-bold">Info</AlertTitle>
              <AlertDescription className="text-sm text-white/50">Informational alert message.</AlertDescription>
            </Alert>
            <Alert variant="destructive" className="rounded-none border-2 py-4 px-5">
              <CircleAlert className="size-5" />
              <AlertTitle className="text-base font-bold">Error</AlertTitle>
              <AlertDescription className="text-sm">Something went wrong.</AlertDescription>
            </Alert>
          </div>
        </Section>

        {/* ── Dialog & Tooltip ── */}
        <Section title="DIALOG & TOOLTIP">
          <div className="flex gap-5">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="text-base font-bold px-8 h-12 rounded-none border-2 border-white/15 hover:scale-[1.02] transition-all">Open Dialog</Button>
              </DialogTrigger>
              <DialogContent className="rounded-none border-2 border-white/15">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">Dialog Title</DialogTitle>
                  <DialogDescription className="text-base text-white/50">Modal dialog content.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button className="text-base font-bold px-8 py-3 h-auto rounded-none">Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="text-base font-bold px-8 h-12 rounded-none border-2 border-white/15">Tooltip</Button>
              </TooltipTrigger>
              <TooltipContent className="rounded-none text-base font-medium px-4 py-2">
                <p>Tooltip message</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </Section>

        {/* ── Tabs ── */}
        <Section title="TABS">
          <Tabs defaultValue="t1">
            <TabsList className="rounded-none h-12">
              <TabsTrigger value="t1" className="text-base font-bold rounded-none px-6 h-10">Tab 1</TabsTrigger>
              <TabsTrigger value="t2" className="text-base font-bold rounded-none px-6 h-10">Tab 2</TabsTrigger>
              <TabsTrigger value="t3" className="text-base font-bold rounded-none px-6 h-10">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="t1" className="pt-4 text-base text-white/60">Content for tab 1.</TabsContent>
            <TabsContent value="t2" className="pt-4 text-base text-white/60">Content for tab 2.</TabsContent>
            <TabsContent value="t3" className="pt-4 text-base text-white/60">Content for tab 3.</TabsContent>
          </Tabs>
        </Section>

        {/* ── Separator ── */}
        <Section title="SEPARATOR">
          <div className="space-y-5 text-base text-white/50 font-medium">
            <p>Content above</p>
            <Separator className="bg-white/15 h-0.5" />
            <p>Content below</p>
          </div>
        </Section>

        {/* ── Nav ── */}
        <div className="flex justify-between items-center pt-10 border-t-2 border-white/15 text-base font-bold">
          <Link href="/showcase/1" className="text-white/40 hover:text-white transition-colors">&larr; Compact &amp; Dense</Link>
          <Link href="/showcase/3" className="text-white/40 hover:text-white transition-colors">Soft &amp; Rounded &rarr;</Link>
        </div>
      </main>
    </div>
  );
}
