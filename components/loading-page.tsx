import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Layout } from "./NavButtons";

interface LoadingPageProps {
  isMobile?: boolean;
}

export function LoadingPage({ isMobile = false }: LoadingPageProps) {
  return (
    <Layout isMobile={isMobile}>
      <Card className="w-full max-w-md mx-auto mt-20">
        <CardHeader>
          <CardTitle>Retrieving Your Fantasy Data</CardTitle>
          <CardDescription>This may take a few moments...</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={33} className="w-full" />
        </CardContent>
      </Card>
    </Layout>
  );
}
