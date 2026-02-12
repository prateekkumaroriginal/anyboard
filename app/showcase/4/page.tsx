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
      <h2 className="text-sm font-medium tracking-[0.15em] uppercase text-amber-400/90">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function Showcase4() {
  return (
    <div
      className="min-h-screen bg-[#0d0d0d] text-white overflow-hidden"
      style={{ fontFamily: "var(--font-mono), monospace" }}
    >
      <div className="fixed inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-size-[48px_48px]" />

      <header className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-amber-400/10">
        <Link href="/showcase" className="text-lg tracking-[0.3em] uppercase text-amber-400/40 hover:text-amber-400 transition-colors duration-200">
          AnyBoard
        </Link>
        <div className="flex items-center gap-8 text-sm">
          <Link href="/showcase/3" className="text-amber-400/30 hover:text-amber-400 transition-colors duration-200">
            &larr; Prev
          </Link>
          <span className="text-amber-400/20">04 / 05</span>
          <Link href="/showcase/5" className="text-amber-400/30 hover:text-amber-400 transition-colors duration-200">
            Next &rarr;
          </Link>
        </div>
      </header>

      <main className="relative z-10 max-w-3xl mx-auto px-8 pt-14 pb-24 space-y-12">
        <div>
          <span className="text-xs tracking-[0.2em] uppercase text-amber-400/50 block mb-2">
            Variation 04
          </span>
          <h1
            className="text-4xl font-bold tracking-tighter mb-2 text-amber-400"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            OUTLINED &amp; GLOWING
          </h1>
          <p className="text-sm text-amber-400/40">
            Wireframe aesthetic, amber borders, neon glow on interaction.
          </p>
        </div>

        {/* ── Buttons ── */}
        <Section title="Buttons">
          <div className="flex flex-wrap gap-3">
            <Button className="text-sm px-5 py-2 h-auto rounded-sm bg-transparent border border-amber-400/30 text-amber-400 hover:bg-amber-400 hover:text-black hover:shadow-[0_0_12px_rgba(251,191,36,0.2)] transition-all duration-200">Default</Button>
            <Button variant="secondary" className="text-sm px-5 py-2 h-auto rounded-sm bg-transparent border border-white/10 text-white/70 hover:border-amber-400/30 hover:text-amber-400 hover:shadow-[0_0_12px_rgba(251,191,36,0.1)] transition-all duration-200">Secondary</Button>
            <Button variant="outline" className="text-sm px-5 py-2 h-auto rounded-sm border-amber-400/20 bg-transparent text-amber-400/70 hover:border-amber-400/50 hover:shadow-[0_0_12px_rgba(251,191,36,0.15)] transition-all duration-200">Outline</Button>
            <Button variant="ghost" className="text-sm px-5 py-2 h-auto rounded-sm text-amber-400/50 hover:text-amber-400 hover:bg-amber-400/5 transition-all duration-200">Ghost</Button>
            <Button variant="link" className="text-sm px-0 h-auto text-amber-400/60 hover:text-amber-400">Link</Button>
            <Button variant="destructive" className="text-sm px-5 py-2 h-auto rounded-sm bg-transparent border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white hover:shadow-[0_0_12px_rgba(239,68,68,0.2)] transition-all duration-200">Destructive</Button>
          </div>
        </Section>

        {/* ── Toggle & Dropdown ── */}
        <Section title="Toggle & Dropdown">
          <div className="flex gap-3">
            <Toggle aria-label="Toggle" className="text-sm h-9 px-3 min-w-9 rounded-sm border border-amber-400/15 text-amber-400/50 data-[state=on]:border-amber-400/40 data-[state=on]:text-amber-400 data-[state=on]:shadow-[0_0_8px_rgba(251,191,36,0.1)] transition-all duration-200">Aa</Toggle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-sm px-5 h-9 rounded-sm border-amber-400/20 bg-transparent text-amber-400/70 hover:shadow-[0_0_12px_rgba(251,191,36,0.15)] transition-all duration-200">Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-sm border-amber-400/15 bg-[#0d0d0d] shadow-[0_0_20px_rgba(251,191,36,0.08)] min-w-[150px]">
                <DropdownMenuLabel className="text-xs text-amber-400/40 tracking-wider uppercase">Actions</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-amber-400/10" />
                <DropdownMenuItem className="text-sm text-white/70 focus:text-amber-400 focus:bg-amber-400/5 rounded-sm">View</DropdownMenuItem>
                <DropdownMenuItem className="text-sm text-white/70 focus:text-amber-400 focus:bg-amber-400/5 rounded-sm">Edit</DropdownMenuItem>
                <DropdownMenuItem className="text-sm text-white/70 focus:text-amber-400 focus:bg-amber-400/5 rounded-sm">Export</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Section>

        {/* ── Form Controls ── */}
        <Section title="Form Controls">
          <div className="space-y-5 max-w-sm">
            <div>
              <label className="block text-xs text-amber-400/40 mb-1.5 tracking-wider uppercase">Input</label>
              <Input placeholder="Enter text..." className="text-sm h-9 px-0 rounded-none border-0 border-b border-amber-400/20 bg-transparent focus:border-amber-400/60 focus:shadow-[0_2px_8px_-2px_rgba(251,191,36,0.15)] transition-all duration-200 placeholder:text-white/20" />
            </div>
            <div>
              <label className="block text-xs text-amber-400/40 mb-1.5 tracking-wider uppercase">Textarea</label>
              <Textarea placeholder="Type message..." rows={3} className="text-sm px-0 py-2 rounded-none border-0 border-b border-amber-400/20 bg-transparent focus:border-amber-400/60 focus:shadow-[0_2px_8px_-2px_rgba(251,191,36,0.15)] transition-all duration-200 placeholder:text-white/20 min-h-0" />
            </div>
            <div className="flex items-center gap-3">
              <Switch defaultChecked />
              <span className="text-sm text-white/60">Toggle switch</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="t4" className="rounded-sm border-amber-400/25 data-[state=checked]:bg-amber-400 data-[state=checked]:border-amber-400" />
              <label htmlFor="t4" className="text-sm text-white/60">Accept terms</label>
            </div>
            <div>
              <label className="block text-xs text-amber-400/40 mb-1.5 tracking-wider uppercase">Radio</label>
              <RadioGroup defaultValue="a" className="gap-2.5">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="a" id="r4a" className="border-amber-400/25" />
                  <label htmlFor="r4a" className="text-sm text-white/70">Option A</label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="b" id="r4b" className="border-amber-400/25" />
                  <label htmlFor="r4b" className="text-sm text-white/70">Option B</label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <label className="block text-xs text-amber-400/40 mb-1.5 tracking-wider uppercase">Select</label>
              <Select>
                <SelectTrigger className="text-sm h-9 px-3 rounded-sm border-amber-400/20 bg-transparent hover:border-amber-400/40 transition-colors duration-200">
                  <SelectValue placeholder="Pick one" />
                </SelectTrigger>
                <SelectContent className="rounded-sm border-amber-400/15 bg-[#0d0d0d] shadow-[0_0_20px_rgba(251,191,36,0.08)]">
                  <SelectItem value="a" className="text-sm focus:bg-amber-400/5 focus:text-amber-400 rounded-sm">Option A</SelectItem>
                  <SelectItem value="b" className="text-sm focus:bg-amber-400/5 focus:text-amber-400 rounded-sm">Option B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs text-amber-400/40 mb-1.5 tracking-wider uppercase">Slider</label>
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>
          </div>
        </Section>

        {/* ── Card ── */}
        <Section title="Card">
          <Card className="rounded-sm border-amber-400/10 bg-transparent py-6 gap-4 shadow-none hover:border-amber-400/25 hover:shadow-[0_0_24px_rgba(251,191,36,0.05)] transition-all duration-300">
            <CardHeader className="px-6 gap-1.5">
              <CardTitle className="text-base font-medium text-amber-400/90">Card Title</CardTitle>
              <CardDescription className="text-sm text-white/30">Card description text</CardDescription>
            </CardHeader>
            <CardContent className="px-6">
              <p className="text-sm text-white/50">Card content goes here.</p>
            </CardContent>
            <CardFooter className="px-6">
              <Button className="text-sm px-4 py-1.5 h-auto rounded-sm bg-transparent border border-amber-400/30 text-amber-400 hover:bg-amber-400 hover:text-black hover:shadow-[0_0_12px_rgba(251,191,36,0.2)] transition-all duration-200">Action</Button>
            </CardFooter>
          </Card>
        </Section>

        {/* ── Badges ── */}
        <Section title="Badges">
          <div className="flex flex-wrap gap-2.5">
            <Badge className="text-xs px-2 py-0.5 rounded-sm bg-transparent border border-amber-400/30 text-amber-400">Default</Badge>
            <Badge variant="secondary" className="text-xs px-2 py-0.5 rounded-sm bg-transparent border border-white/15 text-white/60">Secondary</Badge>
            <Badge variant="outline" className="text-xs px-2 py-0.5 rounded-sm border-amber-400/20 text-amber-400/70">Outline</Badge>
            <Badge variant="destructive" className="text-xs px-2 py-0.5 rounded-sm bg-transparent border border-red-500/30 text-red-400">Destructive</Badge>
          </div>
        </Section>

        {/* ── Avatar ── */}
        <Section title="Avatar">
          <div className="flex gap-3">
            <Avatar className="size-9 rounded-sm border border-amber-400/20">
              <AvatarFallback className="rounded-sm bg-transparent text-amber-400/70 text-sm">AB</AvatarFallback>
            </Avatar>
            <Avatar className="size-9 rounded-sm border border-amber-400/20">
              <AvatarFallback className="rounded-sm bg-transparent text-amber-400/70 text-sm">CD</AvatarFallback>
            </Avatar>
          </div>
        </Section>

        {/* ── Progress ── */}
        <Section title="Progress">
          <div className="space-y-2 max-w-sm">
            <Progress value={65} className="h-1.5 rounded-sm" />
            <Progress value={33} className="h-1.5 rounded-sm" />
          </div>
        </Section>

        {/* ── Table ── */}
        <Section title="Table">
          <div className="border border-amber-400/10 overflow-hidden rounded-sm">
            <Table>
              <TableHeader>
                <TableRow className="border-amber-400/10">
                  <TableHead className="text-xs tracking-wider uppercase text-amber-400/40 h-9 px-4">Name</TableHead>
                  <TableHead className="text-xs tracking-wider uppercase text-amber-400/40 h-9 px-4">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-amber-400/10 hover:bg-amber-400/[0.03] transition-colors duration-200">
                  <TableCell className="text-sm text-white/70 px-4 py-2.5">Dashboard A</TableCell>
                  <TableCell className="px-4 py-2.5"><Badge className="text-xs px-2 py-0.5 rounded-sm bg-transparent border border-amber-400/30 text-amber-400">Active</Badge></TableCell>
                </TableRow>
                <TableRow className="border-amber-400/10 hover:bg-amber-400/[0.03] transition-colors duration-200">
                  <TableCell className="text-sm text-white/70 px-4 py-2.5">Dashboard B</TableCell>
                  <TableCell className="px-4 py-2.5"><Badge className="text-xs px-2 py-0.5 rounded-sm bg-transparent border border-white/15 text-white/60">Pending</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Section>

        {/* ── Alert ── */}
        <Section title="Alert">
          <div className="space-y-3 max-w-md">
            <Alert className="rounded-sm border-amber-400/15 bg-transparent py-3 px-4">
              <CircleAlert className="size-4 text-amber-400/60" />
              <AlertTitle className="text-sm font-medium text-amber-400/80">Info</AlertTitle>
              <AlertDescription className="text-xs text-white/40">Informational alert message.</AlertDescription>
            </Alert>
            <Alert variant="destructive" className="rounded-sm border-red-500/20 bg-transparent py-3 px-4">
              <CircleAlert className="size-4" />
              <AlertTitle className="text-sm font-medium">Error</AlertTitle>
              <AlertDescription className="text-xs">Something went wrong.</AlertDescription>
            </Alert>
          </div>
        </Section>

        {/* ── Dialog & Tooltip ── */}
        <Section title="Dialog & Tooltip">
          <div className="flex gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="text-sm px-5 h-9 rounded-sm border-amber-400/20 bg-transparent text-amber-400/70 hover:border-amber-400/50 hover:shadow-[0_0_12px_rgba(251,191,36,0.15)] transition-all duration-200">Open Dialog</Button>
              </DialogTrigger>
              <DialogContent className="rounded-sm border-amber-400/15 bg-[#0d0d0d] shadow-[0_0_40px_rgba(251,191,36,0.06)]">
                <DialogHeader>
                  <DialogTitle className="text-lg font-medium text-amber-400">Dialog Title</DialogTitle>
                  <DialogDescription className="text-sm text-white/40">Modal dialog content.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button className="text-sm px-5 py-2 h-auto rounded-sm bg-amber-400 text-black hover:shadow-[0_0_12px_rgba(251,191,36,0.3)] transition-all duration-200">Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="text-sm px-5 h-9 rounded-sm border-amber-400/20 bg-transparent text-amber-400/70 hover:border-amber-400/50 hover:shadow-[0_0_12px_rgba(251,191,36,0.15)] transition-all duration-200">Tooltip</Button>
              </TooltipTrigger>
              <TooltipContent className="rounded-sm border border-amber-400/15 bg-[#0d0d0d] text-amber-400 text-sm shadow-[0_0_16px_rgba(251,191,36,0.1)]">
                <p>Tooltip message</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </Section>

        {/* ── Tabs ── */}
        <Section title="Tabs">
          <Tabs defaultValue="t1">
            <TabsList className="rounded-sm h-9 bg-transparent border border-amber-400/10 p-0.5">
              <TabsTrigger value="t1" className="text-sm rounded-sm px-4 h-7 text-amber-400/50 data-[state=active]:text-amber-400 data-[state=active]:bg-amber-400/10 data-[state=active]:shadow-[0_0_8px_rgba(251,191,36,0.08)] transition-all duration-200">Tab 1</TabsTrigger>
              <TabsTrigger value="t2" className="text-sm rounded-sm px-4 h-7 text-amber-400/50 data-[state=active]:text-amber-400 data-[state=active]:bg-amber-400/10 data-[state=active]:shadow-[0_0_8px_rgba(251,191,36,0.08)] transition-all duration-200">Tab 2</TabsTrigger>
              <TabsTrigger value="t3" className="text-sm rounded-sm px-4 h-7 text-amber-400/50 data-[state=active]:text-amber-400 data-[state=active]:bg-amber-400/10 data-[state=active]:shadow-[0_0_8px_rgba(251,191,36,0.08)] transition-all duration-200">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="t1" className="pt-3 text-sm text-white/50">Content for tab 1.</TabsContent>
            <TabsContent value="t2" className="pt-3 text-sm text-white/50">Content for tab 2.</TabsContent>
            <TabsContent value="t3" className="pt-3 text-sm text-white/50">Content for tab 3.</TabsContent>
          </Tabs>
        </Section>

        {/* ── Separator ── */}
        <Section title="Separator">
          <div className="space-y-3 text-sm text-white/50">
            <p>Content above</p>
            <Separator className="bg-amber-400/10" />
            <p>Content below</p>
          </div>
        </Section>

        {/* ── Nav ── */}
        <div className="flex justify-between items-center pt-8 border-t border-amber-400/10 text-sm">
          <Link href="/showcase/3" className="text-amber-400/30 hover:text-amber-400 transition-colors duration-200">&larr; Soft &amp; Rounded</Link>
          <Link href="/showcase/5" className="text-amber-400/30 hover:text-amber-400 transition-colors duration-200">Spacious &amp; Borderless &rarr;</Link>
        </div>
      </main>
    </div>
  );
}
