import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useMemo } from "react";

const renderBackdrop = useMemo(
  () => props =>
    (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.8}
      />
    ),
  [],
);

export {renderBackdrop};
