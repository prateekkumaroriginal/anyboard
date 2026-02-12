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
      <h2 className="text-base font-medium tracking-tight text-amber-400/70">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function Showcase5() {
  return (
    <div
      className="min-h-screen bg-[#0d0d0d] text-white overflow-hidden"
      style={{ fontFamily: "var(--font-mono), monospace" }}
    >
      <div className="fixed inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-size-[48px_48px]" />

      <header className="relative z-10 flex items-center justify-between px-10 py-8">
        <Link href="/showcase" className="text-lg tracking-[0.3em] uppercase opacity-40 hover:opacity-100 transition-opacity duration-300">
          AnyBoard
        </Link>
        <div className="flex items-center gap-8 text-base">
          <Link href="/showcase/4" className="text-white/30 hover:text-white transition-colors duration-300">
            &larr; Prev
          </Link>
          <span className="text-white/15">05 / 05</span>
          <Link href="/showcase" className="text-white/30 hover:text-white transition-colors duration-300">
            Index
          </Link>
        </div>
      </header>

      <main className="relative z-10 max-w-2xl mx-auto px-10 pt-16 pb-32 space-y-20">
        <div>
          <span className="text-xs tracking-[0.2em] uppercase text-amber-400/40 block mb-3">
            Variation 05
          </span>
          <h1
            className="text-4xl font-medium tracking-tighter mb-3"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            SPACIOUS &amp; BORDERLESS
          </h1>
          <p className="text-base text-white/35 leading-relaxed">
            No borders. Background fills. Generous whitespace. Ultra-minimal.
          </p>
        </div>

        {/* ── Buttons ── */}
        <Section title="Buttons">
          <div className="flex flex-wrap gap-4">
            <Button className="text-base px-6 py-3 h-auto rounded-none border-none shadow-none bg-amber-400 text-black hover:bg-amber-300 transition-colors duration-300">Default</Button>
            <Button variant="secondary" className="text-base px-6 py-3 h-auto rounded-none border-none shadow-none bg-white/[0.07] text-white/80 hover:bg-white/[0.12] transition-colors duration-300">Secondary</Button>
            <Button variant="outline" className="text-base px-6 py-3 h-auto rounded-none border-none shadow-none bg-white/[0.04] text-white/60 hover:bg-white/[0.08] transition-colors duration-300">Outline</Button>
            <Button variant="ghost" className="text-base px-6 py-3 h-auto rounded-none border-none shadow-none text-white/50 hover:bg-white/[0.05] hover:text-white/80 transition-all duration-300">Ghost</Button>
            <Button variant="link" className="text-base px-0 h-auto border-none text-white/50 hover:text-white">Link</Button>
            <Button variant="destructive" className="text-base px-6 py-3 h-auto rounded-none border-none shadow-none hover:brightness-110 transition-all duration-300">Destructive</Button>
          </div>
        </Section>

        {/* ── Toggle & Dropdown ── */}
        <Section title="Toggle & Dropdown">
          <div className="flex gap-4">
            <Toggle aria-label="Toggle" className="text-base h-11 px-4 min-w-11 rounded-none border-none bg-white/[0.04] text-white/50 data-[state=on]:bg-white/[0.1] data-[state=on]:text-white transition-all duration-300">Aa</Toggle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-base px-6 h-11 rounded-none border-none bg-white/[0.04] text-white/60 hover:bg-white/[0.08] transition-colors duration-300">Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-none border-none bg-[#1a1a1a] shadow-2xl shadow-black/50 min-w-[160px]">
                <DropdownMenuLabel className="text-xs text-white/30">Actions</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuItem className="text-base rounded-none text-white/60 focus:bg-white/[0.06] focus:text-white">View</DropdownMenuItem>
                <DropdownMenuItem className="text-base rounded-none text-white/60 focus:bg-white/[0.06] focus:text-white">Edit</DropdownMenuItem>
                <DropdownMenuItem className="text-base rounded-none text-white/60 focus:bg-white/[0.06] focus:text-white">Export</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Section>

        {/* ── Form Controls ── */}
        <Section title="Form Controls">
          <div className="space-y-8 max-w-sm">
            <div>
              <label className="block text-sm text-white/30 mb-2">Input</label>
              <Input placeholder="Enter text..." className="text-base h-11 px-4 rounded-none border-none bg-white/[0.05] shadow-none placeholder:text-white/20 focus:bg-white/[0.08] transition-colors duration-300" />
            </div>
            <div>
              <label className="block text-sm text-white/30 mb-2">Textarea</label>
              <Textarea placeholder="Type message..." rows={3} className="text-base px-4 py-3 rounded-none border-none bg-white/[0.05] shadow-none placeholder:text-white/20 focus:bg-white/[0.08] transition-colors duration-300" />
            </div>
            <div className="flex items-center gap-4">
              <Switch defaultChecked />
              <span className="text-base text-white/60">Toggle switch</span>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="t5" className="rounded-none border-none bg-white/[0.08] data-[state=checked]:bg-amber-400" />
              <label htmlFor="t5" className="text-base text-white/60">Accept terms</label>
            </div>
            <div>
              <label className="block text-sm text-white/30 mb-2">Radio</label>
              <RadioGroup defaultValue="a" className="gap-4">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="a" id="r5a" />
                  <label htmlFor="r5a" className="text-base text-white/70">Option A</label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="b" id="r5b" />
                  <label htmlFor="r5b" className="text-base text-white/70">Option B</label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <label className="block text-sm text-white/30 mb-2">Select</label>
              <Select>
                <SelectTrigger className="text-base h-11 px-4 rounded-none border-none bg-white/[0.05] shadow-none">
                  <SelectValue placeholder="Pick one" />
                </SelectTrigger>
                <SelectContent className="rounded-none border-none bg-[#1a1a1a] shadow-2xl shadow-black/50">
                  <SelectItem value="a" className="text-base rounded-none">Option A</SelectItem>
                  <SelectItem value="b" className="text-base rounded-none">Option B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm text-white/30 mb-2">Slider</label>
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>
          </div>
        </Section>

        {/* ── Card ── */}
        <Section title="Card">
          <Card className="rounded-none border-none bg-white/[0.04] py-8 gap-5 shadow-none">
            <CardHeader className="px-8 gap-2">
              <CardTitle className="text-lg font-medium">Card Title</CardTitle>
              <CardDescription className="text-base text-white/30">Card description text</CardDescription>
            </CardHeader>
            <CardContent className="px-8">
              <p className="text-base text-white/50">Card content goes here.</p>
            </CardContent>
            <CardFooter className="px-8">
              <Button className="text-base px-6 py-3 h-auto rounded-none border-none bg-amber-400 text-black hover:bg-amber-300 transition-colors duration-300">Action</Button>
            </CardFooter>
          </Card>
        </Section>

        {/* ── Badges ── */}
        <Section title="Badges">
          <div className="flex flex-wrap gap-3">
            <Badge className="text-sm px-3 py-1 rounded-none border-none">Default</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1 rounded-none border-none bg-white/[0.07]">Secondary</Badge>
            <Badge variant="outline" className="text-sm px-3 py-1 rounded-none border-none bg-white/[0.04] text-white/60">Outline</Badge>
            <Badge variant="destructive" className="text-sm px-3 py-1 rounded-none border-none">Destructive</Badge>
          </div>
        </Section>

        {/* ── Avatar ── */}
        <Section title="Avatar">
          <div className="flex gap-4">
            <Avatar className="size-10 rounded-none">
              <AvatarFallback className="rounded-none bg-white/[0.07] text-base">AB</AvatarFallback>
            </Avatar>
            <Avatar className="size-10 rounded-none">
              <AvatarFallback className="rounded-none bg-white/[0.07] text-base">CD</AvatarFallback>
            </Avatar>
          </div>
        </Section>

        {/* ── Progress ── */}
        <Section title="Progress">
          <div className="space-y-3 max-w-sm">
            <Progress value={65} className="h-1.5 rounded-none" />
            <Progress value={33} className="h-1.5 rounded-none" />
          </div>
        </Section>

        {/* ── Table ── */}
        <Section title="Table">
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-none bg-white/[0.03]">
                  <TableHead className="text-sm text-white/30 h-11 px-5">Name</TableHead>
                  <TableHead className="text-sm text-white/30 h-11 px-5">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-none hover:bg-white/[0.03] transition-colors duration-300">
                  <TableCell className="text-base px-5 py-4">Dashboard A</TableCell>
                  <TableCell className="px-5 py-4"><Badge variant="secondary" className="text-sm px-3 py-1 rounded-none border-none bg-white/[0.07]">Active</Badge></TableCell>
                </TableRow>
                <TableRow className="border-none bg-white/[0.015] hover:bg-white/[0.04] transition-colors duration-300">
                  <TableCell className="text-base px-5 py-4">Dashboard B</TableCell>
                  <TableCell className="px-5 py-4"><Badge className="text-sm px-3 py-1 rounded-none border-none">Pending</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Section>

        {/* ── Alert ── */}
        <Section title="Alert">
          <div className="space-y-4 max-w-md">
            <Alert className="rounded-none border-none bg-white/[0.04] py-4 px-5">
              <CircleAlert className="size-4" />
              <AlertTitle className="text-base font-medium">Info</AlertTitle>
              <AlertDescription className="text-sm text-white/40">Informational alert message.</AlertDescription>
            </Alert>
            <Alert variant="destructive" className="rounded-none border-none bg-red-950/30 py-4 px-5">
              <CircleAlert className="size-4" />
              <AlertTitle className="text-base font-medium">Error</AlertTitle>
              <AlertDescription className="text-sm">Something went wrong.</AlertDescription>
            </Alert>
          </div>
        </Section>

        {/* ── Dialog & Tooltip ── */}
        <Section title="Dialog & Tooltip">
          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="text-base px-6 h-11 rounded-none border-none bg-white/[0.04] text-white/60 hover:bg-white/[0.08] transition-colors duration-300">Open Dialog</Button>
              </DialogTrigger>
              <DialogContent className="rounded-none border-none bg-[#141414] shadow-2xl shadow-black/60">
                <DialogHeader>
                  <DialogTitle className="text-xl font-medium">Dialog Title</DialogTitle>
                  <DialogDescription className="text-base text-white/40">Modal dialog content.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button className="text-base px-6 py-3 h-auto rounded-none border-none bg-amber-400 text-black">Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="text-base px-6 h-11 rounded-none border-none bg-white/[0.04] text-white/60 hover:bg-white/[0.08] transition-colors duration-300">Tooltip</Button>
              </TooltipTrigger>
              <TooltipContent className="rounded-none border-none bg-white text-black text-base px-4 py-2 shadow-lg">
                <p>Tooltip message</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </Section>

        {/* ── Tabs ── */}
        <Section title="Tabs">
          <Tabs defaultValue="t1">
            <TabsList className="rounded-none h-11 bg-white/[0.03] border-none p-1">
              <TabsTrigger value="t1" className="text-base rounded-none px-5 h-9 text-white/40 data-[state=active]:bg-white/[0.06] data-[state=active]:text-white transition-all duration-300">Tab 1</TabsTrigger>
              <TabsTrigger value="t2" className="text-base rounded-none px-5 h-9 text-white/40 data-[state=active]:bg-white/[0.06] data-[state=active]:text-white transition-all duration-300">Tab 2</TabsTrigger>
              <TabsTrigger value="t3" className="text-base rounded-none px-5 h-9 text-white/40 data-[state=active]:bg-white/[0.06] data-[state=active]:text-white transition-all duration-300">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="t1" className="pt-4 text-base text-white/50">Content for tab 1.</TabsContent>
            <TabsContent value="t2" className="pt-4 text-base text-white/50">Content for tab 2.</TabsContent>
            <TabsContent value="t3" className="pt-4 text-base text-white/50">Content for tab 3.</TabsContent>
          </Tabs>
        </Section>

        {/* ── Separator ── */}
        <Section title="Separator">
          <div className="space-y-6 text-base text-white/50">
            <p>Content above</p>
            <Separator className="bg-white/5" />
            <p>Content below</p>
          </div>
        </Section>

        {/* ── Nav ── */}
        <div className="flex justify-between items-center pt-12 text-base">
          <Link href="/showcase/4" className="text-white/25 hover:text-white transition-colors duration-300">&larr; Outlined &amp; Glowing</Link>
          <Link href="/showcase" className="text-white/25 hover:text-white transition-colors duration-300">Back to Index</Link>
        </div>
      </main>
    </div>
  );
}
