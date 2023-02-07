using System;
using System.Collections.Generic;

namespace SilentApp.API.Models.App.Request
{
    public class AddActionRequest
    {
        public List<int> LinkIdList { get; set; }
        public DateTime ActionDate { get; set; }
        public bool Active { get; set; }
    }
}
