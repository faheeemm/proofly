"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    defaultCurrency: "USD",
    defaultTaxRate: "0",
    companyName: "",
    companyAddress: "",
    companyPhone: "",
    companyEmail: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Implement settings update logic here
      toast({
        title: "Success",
        description: "Settings updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Manage your account preferences and company information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notifications</h3>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, emailNotifications: checked })
                    }
                  />
                  <Label htmlFor="emailNotifications">Email notifications</Label>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Default Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="defaultCurrency">Default Currency</Label>
                    <Input
                      id="defaultCurrency"
                      value={settings.defaultCurrency}
                      onChange={(e) =>
                        setSettings({ ...settings, defaultCurrency: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultTaxRate">Default Tax Rate (%)</Label>
                    <Input
                      id="defaultTaxRate"
                      type="number"
                      min="0"
                      max="100"
                      value={settings.defaultTaxRate}
                      onChange={(e) =>
                        setSettings({ ...settings, defaultTaxRate: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Company Information</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={settings.companyName}
                      onChange={(e) =>
                        setSettings({ ...settings, companyName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyAddress">Company Address</Label>
                    <Input
                      id="companyAddress"
                      value={settings.companyAddress}
                      onChange={(e) =>
                        setSettings({ ...settings, companyAddress: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyPhone">Phone Number</Label>
                      <Input
                        id="companyPhone"
                        value={settings.companyPhone}
                        onChange={(e) =>
                          setSettings({ ...settings, companyPhone: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyEmail">Email Address</Label>
                      <Input
                        id="companyEmail"
                        type="email"
                        value={settings.companyEmail}
                        onChange={(e) =>
                          setSettings({ ...settings, companyEmail: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}