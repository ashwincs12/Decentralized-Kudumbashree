    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.24;

    contract DK {
        struct Member {
            address memaddress;
            string name;
            uint aadhaar;
            string desig;
            uint balance;
            uint loan;
        }

        struct SHG {
            string name;
            string applicant;
            string location;
            address applicant_address;
            uint SHGRegisterTime;
        }

        SHG[] public approvedSHGs;
        SHG[] public pendingSHGs;
        Member[] public members;

        // Mapping from member address to SHG index
        mapping(address => uint) public memberToSHGIndex;
        // Mapping from SHG index to an array of its members
        mapping(uint => Member[]) public SHGToMember;

        address cdsadmin;

        constructor() {
            cdsadmin = msg.sender;
        }

        //------------------------
        struct Nomination {
            address nominee;
            uint timestamp;
        }

        mapping(uint => mapping(address => Nomination)) public shgNominations;

        function nominatePresident() public {
            uint callerSHGIndex = memberToSHGIndex[msg.sender];
            require(callerSHGIndex < approvedSHGs.length, "Caller is not a member of any approved SHG");
            require(block.timestamp <= approvedSHGs[callerSHGIndex].SHGRegisterTime + 10 minutes, "Time for nominations already ended");

            // Check if the member has already nominated someone
            require(shgNominations[callerSHGIndex][msg.sender].timestamp == 0, "You have already nominated");

            // Add the nomination
            shgNominations[callerSHGIndex][msg.sender] = Nomination({
                nominee: msg.sender,
                timestamp: block.timestamp
            });
        }

        // View Nominations
        function viewNominations() public view returns (address[] memory) {
            uint callerSHGIndex = memberToSHGIndex[msg.sender];
            require(callerSHGIndex < approvedSHGs.length, "Caller is not a member of any approved SHG");

            // Get the array of members associated with the caller's SHG index
            Member[] memory SHGMembers = SHGToMember[callerSHGIndex];

            // Count the number of members who have nominated
            uint count = 0;
            for (uint i = 0; i < SHGMembers.length; i++) {
                if (shgNominations[callerSHGIndex][SHGMembers[i].memaddress].timestamp != 0) {
                    count++;
                }
            }

            // Initialize array to store nominee addresses
            address[] memory nominees = new address[](count);
            uint index = 0;

            // Add nominee addresses to the array
            for (uint i = 0; i < SHGMembers.length; i++) {
                if (shgNominations[callerSHGIndex][SHGMembers[i].memaddress].timestamp != 0) {
                    nominees[index] = SHGMembers[i].memaddress;
                    index++;
                }
            }

            return nominees;
        }

        function checkPresidentTenureOver() public view returns (bool){
            uint callerSHGIndex = memberToSHGIndex[msg.sender];
            uint creationTime = approvedSHGs[callerSHGIndex].SHGRegisterTime;
            return (block.timestamp >= creationTime + 1 minutes);
        }
        //------------------------

        function createSHG(string memory _name,string memory _applicant,string memory _location) public {
            pendingSHGs.push(SHG(_name,_applicant,_location,msg.sender,block.timestamp));
        }

        function getPendingSHGs() public view returns (SHG[] memory) {
            return pendingSHGs;
        }

        function getApprovedSHGs() public view returns (SHG[] memory) {
            return approvedSHGs;
        }


        function approveSHG(uint index) public {
            require(index < pendingSHGs.length, "Invalid index");
            approvedSHGs.push(pendingSHGs[index]);
            if (index != pendingSHGs.length - 1) {
                pendingSHGs[index] = pendingSHGs[pendingSHGs.length - 1];
            }
            pendingSHGs.pop();
        }

        struct Notification {
            string title;
            string desc;
            string link;
        }

        Notification[] public n;

        function createNotification(string memory _title,string memory _desc,string memory _link) public {
            require(msg.sender == cdsadmin, "Only CDS Admin can create notification!"); 
            n.push(Notification(_title,_desc,_link));
        }

        function getNotifications() public view returns (Notification[] memory) {
            return n;
        }

        function cdsdash() view public returns(uint,uint,uint) {
            require(msg.sender == cdsadmin, "Invalid authorization, Only CDS Admin can access this dashboard!!!");
            return(approvedSHGs.length,members.length,pendingSHGs.length);
        }

        function memRegandJoin(string memory _name, uint _aadhar, uint SHGindex) public {
            for (uint i = 0; i < members.length; i++) {
                require(members[i].memaddress != msg.sender, "Member already registered");
            }

            require(SHGindex < approvedSHGs.length, "Invalid SHG index");
            memberToSHGIndex[msg.sender] = SHGindex;
            string memory _desig;
            if (msg.sender == approvedSHGs[SHGindex].applicant_address) {
                _desig = "President";
            } else {
                _desig = "Member";
            }

            Member memory newMember = Member(msg.sender, _name, _aadhar, _desig, 0, 0);
            members.push(newMember);
            SHGToMember[SHGindex].push(newMember);
        }


        function memdash() public view returns (uint, uint, uint) {
            uint callerBalance = 0;
            uint callerLoan = 0;
            uint SHGTotalBalance = 0;
            bool isMember = false;
            uint memberSHGIndex = 0;

            for (uint i = 0; i < members.length; i++) {
                if (members[i].memaddress == msg.sender) {
                    isMember = true;
                    callerBalance = members[i].balance;
                    callerLoan = members[i].loan;
                    memberSHGIndex = memberToSHGIndex[msg.sender];
                    break;
                }
            }
            require(isMember, "Caller is not a registered member");

            memberSHGIndex = memberToSHGIndex[msg.sender];
            Member[] memory SHGMembers = SHGToMember[memberSHGIndex];

            for(uint k = 0; k < SHGMembers.length; k++) {
                SHGTotalBalance += SHGMembers[k].balance;
            }

            return (callerBalance, callerLoan, SHGTotalBalance);
        }

        function getContractBalance() public view returns (uint) {
            return address(this).balance;
        }
        
        function weeklyPay() payable public {
            require(msg.value > 0, "No value sent");
            uint callerSHGIndex = memberToSHGIndex[msg.sender];
            require(callerSHGIndex < approvedSHGs.length, "Caller is not a member of any approved SHG");

            // Update the balance of the member
            for(uint i = 0; i < members.length; i++) {
                if (members[i].memaddress == msg.sender) {
                    members[i].balance += msg.value;
                    break; 
                }
            }

            // Update the balance of the corresponding SHG
            uint memberIndexInSHG = 0;
            Member[] storage SHGMembers = SHGToMember[callerSHGIndex];
            for(uint i = 0; i < SHGMembers.length; i++) {
                if (SHGMembers[i].memaddress == msg.sender) {
                    memberIndexInSHG = i;
                    break;
                }
            }
            SHGToMember[callerSHGIndex][memberIndexInSHG].balance += msg.value;
        }


        function loanPay() payable public {
            require(msg.value > 0, "No value sent");

            for(uint i = 0; i < members.length; i++) {
                if (members[i].memaddress == msg.sender) {
                    require(msg.value <= members[i].loan, "Please send an amount less than your loan...");
                    members[i].loan -= msg.value;
                    break; 
                }
            }
        }

        struct Loanvote {
            address payable applicant_add;
            string applicant_name;
            uint amount;
            uint yesCount;
            bool completed;
            bool claimed; // New variable to track if loan has been claimed
            uint startTime;
        }

        mapping(uint => Loanvote[]) public shgIndexToLoan;

        function createloan(uint _amount) public {
            uint callerSHGIndex = memberToSHGIndex[msg.sender];
            Member[] storage SHGMembers = SHGToMember[callerSHGIndex];
            string memory applicantName;
            for(uint i = 0; i < SHGMembers.length; i++) {
                if (SHGMembers[i].memaddress == msg.sender) {
                    applicantName = SHGMembers[i].name;
                    break;
                }
            }
            shgIndexToLoan[callerSHGIndex].push(Loanvote({
                applicant_add: payable(msg.sender),
                applicant_name: applicantName,
                amount: _amount,
                yesCount: 0,
                completed: false,
                claimed: false, // Initialize claimed to false
                startTime: block.timestamp
            }));
        }


    function viewloan() public view returns (Loanvote[] memory) {
            uint callerSHGIndex = memberToSHGIndex[msg.sender];
            require(callerSHGIndex < approvedSHGs.length, "Caller is not a member of any approved SHG");
            return shgIndexToLoan[callerSHGIndex];
        }

        mapping(uint => mapping(address => bool)) public hasVoted;

        function vote(uint _index) public {
            uint callerSHGIndex = memberToSHGIndex[msg.sender];
            require(!hasVoted[_index][msg.sender], "You have already voted for this index");

            Loanvote storage loanVote = shgIndexToLoan[callerSHGIndex][_index];

            require(!loanVote.completed, "Voting is either completed or time has expired for this loan");

            if (block.timestamp > loanVote.startTime + 60 seconds) {
                loanVote.completed = true;
                return; 
            }
            loanVote.yesCount++;
            hasVoted[_index][msg.sender] = true;
        }

        function getNumberOfMembersInSHG() public view returns (uint) {
                uint callerSHGIndex = memberToSHGIndex[msg.sender];
                require(callerSHGIndex < approvedSHGs.length, "Caller is not a member of any approved SHG");

                // Get the array of members associated with the caller's SHG index
                Member[] memory SHGMembers = SHGToMember[callerSHGIndex];

                // Return the number of members in the SHG
                return SHGMembers.length;
        }

        function claimVote(uint _index) public {
            uint callerSHGIndex = memberToSHGIndex[msg.sender];
            require(callerSHGIndex < approvedSHGs.length, "Caller is not a member of any approved SHG");

            Loanvote storage loanVote = shgIndexToLoan[callerSHGIndex][_index];

            require(msg.sender == loanVote.applicant_add, "Only the applicant can claim the vote.");
            require(loanVote.completed, "Vote is not completed yet.");
            require(!loanVote.claimed, "Loan has already been claimed."); // Check if loan has already been claimed

            uint totalMembers = SHGToMember[callerSHGIndex].length;
            uint yesVotes = loanVote.yesCount;

            // Check if the number of yes votes is greater than 50% of total members
            require(yesVotes > (totalMembers / 2), "Not enough yes votes to claim the vote.");

            // Transfer the loan amount to the applicant address
            loanVote.applicant_add.transfer(loanVote.amount);

            // Update the loan variable of the member
            for(uint i = 0; i < members.length; i++) {
                if (members[i].memaddress == msg.sender) {
                    members[i].loan += loanVote.amount;
                    break;
                }
            }

            // Mark the loan as claimed
            loanVote.claimed = true;
        }
    }
