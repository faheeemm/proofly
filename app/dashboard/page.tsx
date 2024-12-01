"use client";

import { useEffect, useState } from "react";
import { withAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Receipt, FileText, BarChart, Settings } from "lucide-react";
import { motion } from "framer-motion";
import ReceiptsPage from "./receipts/page";
import AnalyticsPage from "./analytics/page";
import SettingsPage from "./settings/page";
import { useRouter } from "next/navigation";

interface DashboardData {
  totalReceipts: number;
  generatedToday: number;
  totalAmount: number;
  activeTemplates: number;
}

function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        if (response.ok) {
          const dashboardData = await response.json();
          setData(dashboardData);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  interface QuickStatCardProps {
    title: string;
    value: number | string | null;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  }

  const QuickStatCard = ({ title, value, description, icon: Icon }: QuickStatCardProps) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value || '0'}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );

  const handleCreateFirstReceipt = () => {
    setActiveTab("receipts");
  };

  return (
    <div className="container mx-auto py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
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
                value={data?.totalReceipts ?? null}
                description="All time"
                icon={Receipt}
              />
              <QuickStatCard
                title="Generated Today"
                value={data?.generatedToday ?? null}
                description="Last 24 hours"
                icon={FileText}
              />
              <QuickStatCard
                title="Total Amount"
                value={data?.totalAmount ? `$${data.totalAmount.toFixed(2)}` : '$0.00'}
                description="All time"
                icon={BarChart}
              />
              <QuickStatCard
                title="Active Templates"
                value={data?.activeTemplates ?? null}
                description="Custom templates"
                icon={Settings}
              />
            </div>

            {!loading && (!data || Object.values(data).every(v => !v)) ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <p className="text-muted-foreground mb-4">No data available yet</p>
                  <Button onClick={handleCreateFirstReceipt}>
                    Create your first receipt
                  </Button>
                </CardContent>
              </Card>
            ) : null}
          </TabsContent>

          <TabsContent value="receipts">
            <ReceiptsPage />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsPage />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsPage />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}

export default withAuth(DashboardPage);