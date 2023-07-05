import classnames from "classnames";
import styles from "./DropArea.module.scss";
import React, { useState } from "react";
import {
  Control,
  useController,
  FieldValues,
  RefCallBack,
} from "react-hook-form";

export interface DropAreaProps {
  control: Control<FieldValues>;
  label: string;
  name: string;
  header: string;
  description: string;
  className?: string;
  alt?: string;
}

export const DropArea = ({
  label,
  name,
  control,
  header,
  description,
  alt,
  className = "",
}: DropAreaProps) => {
  const {
    field: { ref, onChange: setSelectedFile, value: selectedFile },
  }: {
    field: {
      ref: RefCallBack;
      onChange: (value: File) => void;
      value: File;
    };
  } = useController({
    name,
    control,
    defaultValue: null,
  });

  const [isOnDragOver, setIsOnDragOver] = useState(false);

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length) setSelectedFile(e.dataTransfer.files[0]);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOnDragOver(false);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOnDragOver(true);
  };

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <label className="g-label">{label}</label>
      <div
        ref={ref}
        className={classnames(styles.dropzone, className, {
          [styles.onDragOver]: isOnDragOver && !selectedFile,
        })}
        onDrop={(e) => onDrop(e)}
        onDragOver={(e) => onDragOver(e)}
        onDragLeave={(e) => onDragLeave(e)}
        onDragStart={(e) => onDragStart(e)}
      >
        {selectedFile ? (
          <div className={styles.preview}>
            <div className={styles.photo}>
              <img alt={alt} src={URL.createObjectURL(selectedFile)} />
            </div>
          </div>
        ) : (
          <label className={styles.dashed}>
            <h1 className={styles.header}>{header}</h1>
            <p className={styles.description}>{description}</p>
            <span className="g-lightButton">Select from computer</span>
            <input
              className={styles.input}
              type="file"
              name={name}
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </label>
        )}
      </div>
    </>
  );
};
