const split = (expensesData: any, membersData: any) => {
    expensesData.map((e: any) => {
        const paidByIndex = membersData.findIndex((m: any) => m.name === e.paidBy);
        const share = e.amount / (e.splitWith.length + 1);
        membersData[paidByIndex].paid += e.amount;
        membersData[paidByIndex].needToPay -= share * e.splitWith.length;
        if (membersData[paidByIndex].needToPay < 0) {
            membersData[paidByIndex].owes -= membersData[paidByIndex].needToPay;
            membersData[paidByIndex].needToPay = 0;
        }
        e.splitWith.map((sp: any) => {
            const paidByIndex = membersData.findIndex((e: any) => e.name === sp);
            membersData[paidByIndex].owes -= share;
            if (membersData[paidByIndex].owes < 0) {
                membersData[paidByIndex].needToPay -= membersData[paidByIndex].owes;
                membersData[paidByIndex].owes = 0;
            }
        });
    });
    return membersData;
};

export default split;
