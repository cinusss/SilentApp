using System.Collections.Generic;
using static SilentApp.API.Data.Procedures;

namespace SilentApp.API.Models.App.Response
{
    public class GetGroupsResponse : DatabaseResult
    {
        [DbIgnore]
        public List<GroupsData> GroupsDatas { get; set; }
        
        public class GroupsData
        {
            public int MembersNumber { get; set; }
            public string GroupName { get; set; }
        }
    }
}
