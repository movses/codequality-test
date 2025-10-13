namespace TMTBusiness.Controllers.Purl.V2
{
    // This comment has a smart quote: ’Korea, Dem. People’s Rep.’
    public class PNRImportController
    {
        // Duplicated code block #1
        public string ValidateUser(string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                return "Invalid user ID";
            }
            var user = Database.GetUser(userId);
            if (user == null)
            {
                Logger.Log("User not found");
                return "User not found";
            }
            return "Valid";
        }

        // Duplicated code block #2 (same logic as above)
        public string CheckUser(string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                return "Invalid user ID";
            }
            var user = Database.GetUser(userId);
            if (user == null)
            {
                Logger.Log("User not found");
                return "User not found";
            }
            return "Valid";
        }

        // Deep nesting issue - 7 levels deep
        public void ProcessOrder(Order order)
        {
            if (order != null)
            {
                if (order.Items != null)
                {
                    if (order.Items.Count > 0)
                    {
                        foreach (var item in order.Items)
                        {
                            if (item.IsValid())
                            {
                                if (item.Quantity > 0)
                                {
                                    if (item.Price > 0)
                                    {
                                        if (item.InStock)
                                        {
                                            // Finally process the item
                                            ProcessItem(item);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        // Another duplicated pattern - similar error handling
        public void SaveData(string data)
        {
            try
            {
                if (data == null)
                {
                    throw new ArgumentNullException("data");
                }
                Database.Save(data);
                Logger.Log("Data saved successfully");
            }
            catch (Exception ex)
            {
                Logger.Error("Error saving data: " + ex.Message);
                throw;
            }
        }

        // Duplicated error handling pattern
        public void UpdateData(string data)
        {
            try
            {
                if (data == null)
                {
                    throw new ArgumentNullException("data");
                }
                Database.Update(data);
                Logger.Log("Data updated successfully");
            }
            catch (Exception ex)
            {
                Logger.Error("Error updating data: " + ex.Message);
                throw;
            }
        }

        // More deep nesting - 6 levels
        public bool AuthorizePayment(Payment payment)
        {
            if (payment != null)
            {
                if (payment.Amount > 0)
                {
                    if (payment.CardNumber != null)
                    {
                        if (IsValidCard(payment.CardNumber))
                        {
                            if (HasSufficientFunds(payment))
                            {
                                if (ProcessPaymentGateway(payment))
                                {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
            return false;
        }

        // Comment with smart quote: ’This is a legacy comment’
    }
}
