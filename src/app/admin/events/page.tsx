'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';
import { createEvent } from '@/lib/events';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { EventFormData, eventSchema } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreateEventForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  const mutation = useMutation({
    mutationFn: createEvent,
    onSuccess: (data) => {
      console.log(data);
      toast.success("Event created successfully!");
      router.push("/events");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: EventFormData) => {
    console.log(data);
    mutation.mutate(data);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md p-4">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create Event</CardTitle>
            <CardDescription className="text-center">
              Fill in the details to create a new event
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Event title" {...register('title')} />
                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Event description" {...register('description')} />
                {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input type="date" id="startDate" {...register('startDate')} />
                {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input type="date" id="endDate" {...register('endDate')} />
                {errors.endDate && <p className="text-sm text-red-500">{errors.endDate.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input type="number" id="price" placeholder="Event price" {...register('price')} />
                {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input id="image" placeholder="Event image URL" {...register('image')} />
                {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select id="status" {...register('status')} className="w-full border rounded-md p-2">
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="CANCELLED">Cancelled</option>
                  <option value="COMPLETED">Completed</option>
                </select>
                {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="userId">User ID</Label>
                <Input id="userId" placeholder="User ID" {...register('userId')} />
                {errors.userId && <p className="text-sm text-red-500">{errors.userId.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="venueId">Venue ID</Label>
                <Input id="venueId" placeholder="Venue ID" {...register('venueId')} />
                {errors.venueId && <p className="text-sm text-red-500">{errors.venueId.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoryId">Category ID</Label>
                <Input id="categoryId" placeholder="Category ID" {...register('categoryId')} />
                {errors.categoryId && <p className="text-sm text-red-500">{errors.categoryId.message}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating event...
                  </>
                ) : (
                  'Create Event'
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-center w-full">
              <Link href="/events" className="text-primary hover:underline">
                Back to Events
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
