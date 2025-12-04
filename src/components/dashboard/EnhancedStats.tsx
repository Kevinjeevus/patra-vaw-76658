import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Activity, Users, Link as LinkIcon, ArrowUp, ArrowDown, BarChart3, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: any;
  trend?: {
    value: number;
    isPositive: boolean;
    label: string;
  };
  chartData?: any[];
  chartColor?: string;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  chartData, 
  chartColor = "#3b82f6",
  delay 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.3 }}
    className="h-full"
  >
    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between">
      <CardContent className="p-6 relative">
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          </div>
          <div className={`p-2 rounded-lg bg-opacity-10`} style={{ backgroundColor: `${chartColor}20` }}>
            <Icon className="w-4 h-4" style={{ color: chartColor }} />
          </div>
        </div>

        {trend && (
          <div className="flex items-center gap-2 text-sm mb-4 relative z-10">
            <span className={`flex items-center px-2 py-0.5 rounded text-xs font-medium ${
              trend.isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
            }`}>
              {trend.isPositive ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
              {Math.abs(trend.value)}%
            </span>
            <span className="text-muted-foreground text-xs">{trend.label}</span>
          </div>
        )}

        {chartData && (
          <div className="absolute bottom-0 left-0 right-0 h-[60px] opacity-50">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={chartColor} 
                  fillOpacity={1} 
                  fill={`url(#gradient-${title})`} 
                  strokeWidth={2} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

interface EnhancedStatsProps {
  stats: {
    totalViews: number;
    savedProfiles: number;
    connections: number;
    viewsTrend: number;
    profilesTrend: number;
  };
  viewData: any[];
  onAnalyticsClick: () => void;
}

export const EnhancedStats: React.FC<EnhancedStatsProps> = ({ stats, viewData, onAnalyticsClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Views"
        value={stats.totalViews.toLocaleString()}
        icon={Eye}
        trend={{
          value: stats.viewsTrend,
          isPositive: stats.viewsTrend >= 0,
          label: "vs last week"
        }}
        chartData={viewData}
        chartColor="#3b82f6" // Blue
        delay={0}
      />
      
      {/* Analytics Link Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        onClick={onAnalyticsClick}
        className="cursor-pointer h-full"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 h-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white relative group">
          <div className="absolute top-0 right-0 p-16 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 group-hover:bg-white/20 transition-colors duration-300" />
          <CardContent className="p-6 flex flex-col justify-between h-full relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-white/80">Performance</p>
                <h3 className="text-xl font-bold mt-1">View Analytics</h3>
              </div>
              <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className="mt-4 flex items-center text-sm font-medium text-white/90 group-hover:text-white">
              <span>Open Dashboard</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <StatCard
        title="Saved Profiles"
        value={stats.savedProfiles}
        icon={Users}
        trend={{
          value: stats.profilesTrend,
          isPositive: stats.profilesTrend >= 0,
          label: "new this week"
        }}
        chartColor="#8b5cf6" // Purple
        delay={0.2}
      />
      
      <StatCard
        title="Connections"
        value={stats.connections}
        icon={LinkIcon}
        chartColor="#f59e0b" // Amber
        delay={0.3}
      />
    </div>
  );
};
