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
    <section className="space-y-3">
      <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-amber-400/80">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function Showcase1() {
  return (
    <div
      className="min-h-screen bg-[#0d0d0d] text-white overflow-hidden"
      style={{ fontFamily: "var(--font-mono), monospace" }}
    >
      <div className="fixed inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-size-[48px_48px]" />

      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
        <Link href="/showcase" className="text-xs tracking-[0.3em] uppercase opacity-50 hover:opacity-100 transition-opacity">
          AnyBoard
        </Link>
        <div className="flex items-center gap-6 text-xs">
          <span className="text-white/30">01 / 05</span>
          <Link href="/showcase/2" className="text-white/50 hover:text-white transition-colors">
            Next &rarr;
          </Link>
        </div>
      </header>

      <main className="relative z-10 max-w-2xl mx-auto px-6 pt-10 pb-20 space-y-8">
        <div>
          <span className="text-[10px] tracking-[0.25em] uppercase text-amber-400/60 block mb-1">
            Variation 01
          </span>
          <h1 className="text-lg font-medium tracking-tight mb-1" style={{ fontFamily: "var(--font-display), sans-serif" }}>
            COMPACT &amp; DENSE
          </h1>
          <p className="text-xs text-white/40">
            Tight spacing, small type, sharp edges. For power users.
          </p>
        </div>

        {/* ── Buttons ── */}
        <Section title="Buttons">
          <div className="flex flex-wrap gap-2">
            <Button className="text-xs px-3 py-1 h-7 rounded-none hover:opacity-80 transition-opacity">Default</Button>
            <Button variant="secondary" className="text-xs px-3 py-1 h-7 rounded-none hover:opacity-80 transition-opacity">Secondary</Button>
            <Button variant="outline" className="text-xs px-3 py-1 h-7 rounded-none border-white/[0.08] hover:opacity-80 transition-opacity">Outline</Button>
            <Button variant="ghost" className="text-xs px-3 py-1 h-7 rounded-none hover:opacity-80 transition-opacity">Ghost</Button>
            <Button variant="link" className="text-xs px-0 h-7">Link</Button>
            <Button variant="destructive" className="text-xs px-3 py-1 h-7 rounded-none hover:opacity-80 transition-opacity">Destructive</Button>
          </div>
        </Section>

        {/* ── Toggle & Dropdown ── */}
        <Section title="Toggle & Dropdown">
          <div className="flex gap-2">
            <Toggle aria-label="Toggle" className="text-xs h-7 px-2 min-w-7 rounded-none">Aa</Toggle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-xs px-3 h-7 rounded-none border-white/[0.08]">Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-none text-xs min-w-[120px]">
                <DropdownMenuLabel className="text-[10px] tracking-widest uppercase text-white/40">Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-xs">View</DropdownMenuItem>
                <DropdownMenuItem className="text-xs">Edit</DropdownMenuItem>
                <DropdownMenuItem className="text-xs">Export</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Section>

        {/* ── Form Controls ── */}
        <Section title="Form Controls">
          <div className="space-y-3 max-w-xs">
            <div>
              <label className="block text-[10px] tracking-widest uppercase text-white/40 mb-1">Input</label>
              <Input placeholder="Enter text..." className="text-xs h-7 px-2 rounded-none border-white/[0.08]" />
            </div>
            <div>
              <label className="block text-[10px] tracking-widest uppercase text-white/40 mb-1">Textarea</label>
              <Textarea placeholder="Type message..." rows={2} className="text-xs px-2 py-1.5 rounded-none border-white/[0.08] min-h-0" />
            </div>
            <div className="flex items-center gap-2">
              <Switch defaultChecked className="scale-75 origin-left" />
              <span className="text-xs text-white/60">Toggle switch</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Checkbox id="t1" className="rounded-none size-3.5" />
              <label htmlFor="t1" className="text-xs text-white/60">Accept terms</label>
            </div>
            <div>
              <label className="block text-[10px] tracking-widest uppercase text-white/40 mb-1">Radio</label>
              <RadioGroup defaultValue="a" className="gap-1.5">
                <div className="flex items-center gap-1.5">
                  <RadioGroupItem value="a" id="r1a" className="size-3.5" />
                  <label htmlFor="r1a" className="text-xs">Option A</label>
                </div>
                <div className="flex items-center gap-1.5">
                  <RadioGroupItem value="b" id="r1b" className="size-3.5" />
                  <label htmlFor="r1b" className="text-xs">Option B</label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <label className="block text-[10px] tracking-widest uppercase text-white/40 mb-1">Select</label>
              <Select>
                <SelectTrigger className="text-xs h-7 px-2 rounded-none border-white/[0.08]">
                  <SelectValue placeholder="Pick one" />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem value="a" className="text-xs">Option A</SelectItem>
                  <SelectItem value="b" className="text-xs">Option B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-[10px] tracking-widest uppercase text-white/40 mb-1">Slider</label>
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>
          </div>
        </Section>

        {/* ── Card ── */}
        <Section title="Card">
          <Card className="rounded-none border-white/[0.08] py-4 gap-3 shadow-none">
            <CardHeader className="px-4 gap-1">
              <CardTitle className="text-xs font-medium tracking-wide uppercase">Card Title</CardTitle>
              <CardDescription className="text-[10px] text-white/40">Card description</CardDescription>
            </CardHeader>
            <CardContent className="px-4">
              <p className="text-xs text-white/60">Card content goes here.</p>
            </CardContent>
            <CardFooter className="px-4">
              <Button className="text-[10px] px-2 py-0.5 h-6 rounded-none">Action</Button>
            </CardFooter>
          </Card>
        </Section>

        {/* ── Badges ── */}
        <Section title="Badges">
          <div className="flex flex-wrap gap-1.5">
            <Badge className="text-[10px] px-1.5 py-0 rounded-none">Default</Badge>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 rounded-none">Secondary</Badge>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 rounded-none border-white/[0.08]">Outline</Badge>
            <Badge variant="destructive" className="text-[10px] px-1.5 py-0 rounded-none">Destructive</Badge>
          </div>
        </Section>

        {/* ── Avatar ── */}
        <Section title="Avatar">
          <div className="flex gap-2">
            <Avatar className="size-6 rounded-none text-[10px]">
              <AvatarFallback className="rounded-none text-[10px]">AB</AvatarFallback>
            </Avatar>
            <Avatar className="size-6 rounded-none text-[10px]">
              <AvatarFallback className="rounded-none text-[10px]">CD</AvatarFallback>
            </Avatar>
          </div>
        </Section>

        {/* ── Progress ── */}
        <Section title="Progress">
          <div className="space-y-1.5 max-w-xs">
            <Progress value={65} className="h-1 rounded-none" />
            <Progress value={33} className="h-1 rounded-none" />
          </div>
        </Section>

        {/* ── Table ── */}
        <Section title="Table">
          <div className="border border-white/[0.06] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-white/[0.06]">
                  <TableHead className="text-[10px] tracking-widest uppercase text-white/40 h-7 px-3">Name</TableHead>
                  <TableHead className="text-[10px] tracking-widest uppercase text-white/40 h-7 px-3">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-white/[0.06]">
                  <TableCell className="text-xs px-3 py-1.5">Dashboard A</TableCell>
                  <TableCell className="px-3 py-1.5"><Badge variant="secondary" className="text-[10px] px-1.5 py-0 rounded-none">Active</Badge></TableCell>
                </TableRow>
                <TableRow className="border-white/[0.06]">
                  <TableCell className="text-xs px-3 py-1.5">Dashboard B</TableCell>
                  <TableCell className="px-3 py-1.5"><Badge className="text-[10px] px-1.5 py-0 rounded-none">Pending</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Section>

        {/* ── Alert ── */}
        <Section title="Alert">
          <div className="space-y-2 max-w-sm">
            <Alert className="rounded-none border-white/[0.06] py-2 px-3 text-xs">
              <CircleAlert className="size-3" />
              <AlertTitle className="text-xs font-medium">Info</AlertTitle>
              <AlertDescription className="text-[10px] text-white/50">Informational alert message.</AlertDescription>
            </Alert>
            <Alert variant="destructive" className="rounded-none py-2 px-3 text-xs">
              <CircleAlert className="size-3" />
              <AlertTitle className="text-xs font-medium">Error</AlertTitle>
              <AlertDescription className="text-[10px]">Something went wrong.</AlertDescription>
            </Alert>
          </div>
        </Section>

        {/* ── Dialog & Tooltip ── */}
        <Section title="Dialog & Tooltip">
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="text-xs px-3 h-7 rounded-none border-white/[0.08]">Open Dialog</Button>
              </DialogTrigger>
              <DialogContent className="rounded-none max-w-sm">
                <DialogHeader>
                  <DialogTitle className="text-sm">Dialog Title</DialogTitle>
                  <DialogDescription className="text-xs text-white/50">Modal dialog content.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button className="text-xs px-3 h-7 rounded-none">Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="text-xs px-3 h-7 rounded-none border-white/[0.08]">Tooltip</Button>
              </TooltipTrigger>
              <TooltipContent className="rounded-none text-xs">
                <p>Tooltip message</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </Section>

        {/* ── Tabs ── */}
        <Section title="Tabs">
          <Tabs defaultValue="t1">
            <TabsList className="rounded-none h-7">
              <TabsTrigger value="t1" className="text-xs rounded-none px-3 h-6">Tab 1</TabsTrigger>
              <TabsTrigger value="t2" className="text-xs rounded-none px-3 h-6">Tab 2</TabsTrigger>
              <TabsTrigger value="t3" className="text-xs rounded-none px-3 h-6">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="t1" className="pt-2 text-xs text-white/60">Content for tab 1.</TabsContent>
            <TabsContent value="t2" className="pt-2 text-xs text-white/60">Content for tab 2.</TabsContent>
            <TabsContent value="t3" className="pt-2 text-xs text-white/60">Content for tab 3.</TabsContent>
          </Tabs>
        </Section>

        {/* ── Separator ── */}
        <Section title="Separator">
          <div className="space-y-2 text-xs text-white/50">
            <p>Content above</p>
            <Separator className="bg-white/[0.06]" />
            <p>Content below</p>
          </div>
        </Section>

        {/* ── Nav ── */}
        <div className="flex justify-between items-center pt-8 border-t border-white/[0.06] text-xs">
          <Link href="/showcase" className="text-white/40 hover:text-white transition-colors">&larr; Index</Link>
          <Link href="/showcase/2" className="text-white/40 hover:text-white transition-colors">Bold &amp; Oversized &rarr;</Link>
        </div>
      </main>
    </div>
  );
}
