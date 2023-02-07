using System;
using System.Collections.Generic;
using static SilentApp.API.Data.Procedures;

namespace SilentApp.API.Models.App.Response
{
    public class LinkResponse : DatabaseResult
    {
        [DbIgnore]
        public List<LinkData> LinkDatas { get; set; }

        [DbParameter]
        public DateTime DownloadDate { get; set; }

        public class LinkData
        {
            public string Link { get; set; }    
            public int LinkId { get; set; }
        }
    }
}
