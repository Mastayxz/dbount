// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract DAO {
    uint public problemCounter;
    uint public solutionCounter;
    uint public quorum = 2;

    struct Problem {
        uint id;
        address owner;
        string description;
        uint reward;
        bool isResolved;
    }

    struct Solution {
        uint id;
        uint problemId;
        address contributor;
        string content;
        uint voteCount;
        bool accepted;
        mapping(address => bool) voters;
    }

    mapping(uint => Problem) public problems;
    mapping(uint => Solution[]) public problemSolutions;

    event ProblemCreated(uint id, address owner);
    event SolutionSubmitted(uint id, uint problemId, address contributor);
    event Voted(uint solutionId, address voter);
    event SolutionAccepted(uint solutionId, address contributor);

    function createProblem(string memory description) external payable {
        require(msg.value > 0, "Reward required");

        problemCounter++;
        problems[problemCounter] = Problem(
            problemCounter,
            msg.sender,
            description,
            msg.value,
            false
        );

        emit ProblemCreated(problemCounter, msg.sender);
    }

    function submitSolution(uint problemId, string memory content) external {
        require(!problems[problemId].isResolved, "Problem already resolved");

        // Tambah elemen kosong ke array
        problemSolutions[problemId].push();
        Solution storage s = problemSolutions[problemId][
            problemSolutions[problemId].length - 1
        ];

        s.id = solutionCounter++;
        s.problemId = problemId;
        s.contributor = msg.sender;
        s.content = content;
        s.voteCount = 0;
        s.accepted = false;

        emit SolutionSubmitted(s.id, problemId, msg.sender);
    }

    function voteSolution(uint problemId, uint solutionIndex) external {
        Solution storage s = problemSolutions[problemId][solutionIndex];
        require(!s.voters[msg.sender], "Already voted");
        require(!s.accepted, "Already accepted");

        s.voters[msg.sender] = true;
        s.voteCount += 1;

        emit Voted(s.id, msg.sender);

        if (s.voteCount >= quorum) {
            _finalizeSolution(problemId, solutionIndex);
        }
    }

    function _finalizeSolution(uint problemId, uint solutionIndex) internal {
        Solution storage s = problemSolutions[problemId][solutionIndex];
        Problem storage p = problems[problemId];

        require(!p.isResolved, "Problem already resolved");
        require(!s.accepted, "Solution already accepted");

        s.accepted = true;
        p.isResolved = true;

        (bool sent, ) = s.contributor.call{value: p.reward}("");
        require(sent, "Reward transfer failed");

        emit SolutionAccepted(s.id, s.contributor);
    }

    // Utility function to get solution info (without mapping voters)
    function getSolution(
        uint problemId,
        uint index
    )
        external
        view
        returns (
            uint id,
            address contributor,
            string memory content,
            uint voteCount,
            bool accepted
        )
    {
        Solution storage s = problemSolutions[problemId][index];
        return (s.id, s.contributor, s.content, s.voteCount, s.accepted);
    }

    function getSolutionsCount(uint problemId) external view returns (uint) {
        return problemSolutions[problemId].length;
    }

    function updateProblem(
        uint problemId,
        string memory newDescription
    ) external payable {
        Problem storage p = problems[problemId];

        require(p.owner == msg.sender, "Not owner");
        require(!p.isResolved, "Problem already resolved");

        // Kembalikan reward lama ke pemilik
        uint oldReward = p.reward;

        if (oldReward > 0) {
            (bool sent, ) = msg.sender.call{value: oldReward}("");
            require(sent, "Refund failed");
        }

        p.description = newDescription;
        p.reward = msg.value;
    }

    function deleteProblem(uint problemId) external {
        require(problems[problemId].owner == msg.sender, "Not owner");
        delete problems[problemId];
    }
}
