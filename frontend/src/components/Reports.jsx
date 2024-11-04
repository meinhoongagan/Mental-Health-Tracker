import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import MentalHealthReportCard from "./MentalHealthReportCard";
import CopingStrategies from "./CopingStrategies";
import SuggestedResources from './SuggestedResources';
import Exercise from './Exercise';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Brain, Heart, Book, Dumbbell } from 'lucide-react';

const Reports = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Wellness Journey</h1>
          <p className="text-gray-600">Track your progress and discover personalized insights</p>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="reports" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Mental Health
            </TabsTrigger>
            <TabsTrigger value="coping" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Coping Tools
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="exercise" className="flex items-center gap-2">
              <Dumbbell className="h-4 w-4" />
              Exercise
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[calc(100vh-280px)]">
            <TabsContent value="reports">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <MentalHealthReportCard />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="coping">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <CopingStrategies />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <SuggestedResources />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="exercise">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <Exercise />
                </CardContent>
              </Card>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;