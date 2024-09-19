import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const ErrorModal = ({error}) => {
  return (
    <Dialog>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col items-center justify-center gap-4 py-8">
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="size-12 text-red-500"
          />
          <p className="text-lg font-medium">Subida de imagen fallida</p>
          <p className="text-muted-foreground">{error}</p>
        </div>
        <DialogFooter>
          <div>
            <Button type="button">OK</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
