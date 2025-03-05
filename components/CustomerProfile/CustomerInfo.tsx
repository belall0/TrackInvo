import { CiPhone, CiCalendar, CiMail } from 'react-icons/ci';
import { LuSquarePen } from 'react-icons/lu';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface CustomerInfoProps {
  name: string;
  email: string;
  phone: string;
  image: string;
  createdAt: string;
}

const CustomerInfo = ({ name, email, phone, image, createdAt }: CustomerInfoProps) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-x-5 pt-5 lg:flex-row">
        <Avatar className="size-24">
          <AvatarImage src={image} alt={`${name}'s profile`} />
          <AvatarFallback>
            {name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col items-start justify-center gap-y-1">
          <h1 className="mb-3 text-2xl font-bold">{name}</h1>

          <div className="flex flex-col items-start gap-y-1 text-gray-500">
            <p className="flex items-center justify-center gap-x-1">
              <CiMail className="size-4" />
              {email}
            </p>

            <p className="flex items-center justify-center gap-x-1">
              <CiPhone className="size-4" />
              {phone}
            </p>

            <p className="flex items-center gap-x-1 text-xs">
              <CiCalendar className="size-4" />
              Customer since {createdAt}{' '}
            </p>
          </div>
        </div>

        <Button variant={'outline'} className="mt-5 w-full lg:ml-auto lg:mt-0 lg:w-1/6">
          <LuSquarePen className="size-4" />
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default CustomerInfo;
