/**
 * @description: FormTemplate Props
 * @return {*}
 * @author: Cyan
 */
export type FormTemplateProps = {
  roleData: API.ROLEMANAGEMENT[];
  jobsData: API.JOBSMANAGEMENT[];
  organizationData: API.ORGANIZATION[];
  reloadTable: () => void;
  setModalVisibleFalse: () => void;
  formData: API.USERMANAGEMENT | undefined;
  modalVisible: boolean;
};

/**
 * @description: UserInformation Props
 * @return {*}
 * @author: Cyan
 */
export type UserInformationProps = {
  roleData: API.ROLEMANAGEMENT[];
  jobsData: API.JOBSMANAGEMENT[];
  organizationData: API.ORGANIZATION[];
};
