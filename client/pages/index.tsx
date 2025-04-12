import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { healthcareFormSchema, HealthcareFormValues } from "../schema/healthcare-form";
import Loading from "../components/Loading";
import { usStates } from "../data/usStates";

import { Button } from "../components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

function HealthcareAIAssistant() {
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<HealthcareFormValues>({
    resolver: zodResolver(healthcareFormSchema),
    defaultValues: {
      name: "",
      age: 0,
      dependents: 0,
      zipCode: "",
      state: "",
      income: "",
      dentalPlanRequired: "no",
    },
  });

  function onSubmit(data: HealthcareFormValues) {
    // Show loading state
    setIsLoading(true);
    
    // Log the form data
    console.log(data);
    
    // Simulate AI processing with a timeout
    setTimeout(() => {
      // Example AI response
      setAiResponse(
        `Based on your information, I recommend considering a PPO plan with a moderate deductible. 
        This type of plan would provide flexibility in choosing healthcare providers while maintaining reasonable costs. 
        ${data.dentalPlanRequired === "yes" ? "I've also included dental coverage options in the recommendation." : ""}
        For more specific recommendations, please consult with a healthcare advisor.`
      );
      setIsLoading(false);
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Loading isLoading={isLoading} />
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-3 text-blue-600">Healthcare AI Assistant</h1>
        <p className="text-gray-600 mb-6 text-center">
          Fill out the form below with your information. Our AI will provide personalized healthcare plan recommendations.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="35" 
                      {...field} 
                      onChange={(e) => field.onChange(e.target.value === "" ? 0 : parseInt(e.target.value, 10))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dependents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dependents</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="2" 
                      {...field} 
                      onChange={(e) => field.onChange(e.target.value === "" ? 0 : parseInt(e.target.value, 10))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="99501" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {usStates.map((state) => (
                        <SelectItem key={state.value} value={state.value}>
                          {state.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="income"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Income</FormLabel>
                  <FormControl>
                    <Input placeholder="$28,000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dentalPlanRequired"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dental Plan Required</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value || "no"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center pt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Get AI Recommendations'}
              </Button>
            </div>
          </form>
        </Form>

        {aiResponse && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">AI Recommendation</h2>
            <p className="text-gray-800">{aiResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HealthcareAIAssistant;
