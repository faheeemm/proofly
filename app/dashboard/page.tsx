"use client";

import { withAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Receipt, FileText, BarChart, Settings } from "lucide-react";
import { motion } from "framer-motion";

function DashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="receipts">Receipts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <QuickStatCard
                title="Total Receipts"
                value="128"
                description="Last 30 days"
                icon={Receipt}
              />
              <QuickStatCard
                title="Generated Today"
                value="12"
                description="Last 24 hours"
                icon={FileText}
              />
              <QuickStatCard
                title="Total Amount"
                value="$12,450"
                description="Last 30 days"
                icon={BarChart}
              />
              <QuickStatCard
                title="Active Templates"
                value="5"
                description="Custom templates"
                icon={Settings}
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest receipt generation activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-lg bg-black/40"
                    >
                      <div className="flex items-center space-x-4">
                        <activity.icon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="receipts">
            <Card>
              <CardHeader>
                <CardTitle>Your Receipts</CardTitle>
                <CardDescription>Manage and view all your generated receipts</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="mb-4">Generate New Receipt</Button>
                <p className="text-muted-foreground">Receipt list will be implemented here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>View your receipt generation statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Analytics charts will be implemented here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage your account and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Settings form will be implemented here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}

interface QuickStatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
}

function QuickStatCard({ title, value, description, icon: Icon }: QuickStatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

const recentActivity = [
  {
    icon: Receipt,
    title: "Invoice #1234 Generated",
    description: "For Client XYZ Corp",
    time: "2 hours ago"
  },
  {
    icon: FileText,
    title: "New Template Created",
    description: "Professional Invoice Template",
    time: "5 hours ago"
  },
  {
    icon: Settings,
    title: "Settings Updated",
    description: "Changed default currency to EUR",
    time: "1 day ago"
  }
];

export default withAuth(DashboardPage);