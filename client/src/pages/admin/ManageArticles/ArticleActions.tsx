import { useDeleteArticleMutation } from "@/api/articles";
import { ArticleType } from "@/types/article";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ConfirmDialog } from "@/components/ConfirmDialogue";
import { MoreVerticalIcon } from "lucide-react";

interface Props {
  article: ArticleType;
}

export const ArticleActions = ({ article }: Props) => {
  const [deleteArticle] = useDeleteArticleMutation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreVerticalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <ConfirmDialog
          title="Delete Article?"
          description="Are you sure you want to permanently delete this article?"
          confirmLabel="Delete"
          onConfirm={async () => {
            await toast.promise(deleteArticle(article.id).unwrap(), {
              loading: "Deleting...",
              success: "Article deleted!",
              error: "Failed to delete article",
            });
          }}
          trigger={<DropdownMenuItem>Delete</DropdownMenuItem>}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
